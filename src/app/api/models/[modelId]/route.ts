import { NextResponse } from 'next/server';
import { MODELS } from '@/constants';

const fetchModelResponse = async (
  url: string,
  headers: Record<string, string>,
  body: string | Buffer,
) => {
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error: ${errorText}`);
  }

  return response;
};

const handleBlobResponse = async (response: Response) => {
  const blob = await response.blob();
  return new NextResponse(blob, {
    headers: {
      'Content-Type': 'audio/mpeg',
    },
  });
};

const handleJsonResponse = async (response: Response) => {
  const data = await response.json();
  return NextResponse.json({ result: data });
};

export async function POST(
  request: Request,
  { params }: { params: Promise<{ modelId: string }> },
) {
  const apiKey = process.env.HUGGINGFACE_API_TOKEN;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'No API key configured' },
      { status: 500 },
    );
  }

  const { modelId } = await params;
  const modelById = MODELS.find((m) => m.id === modelId);

  if (!modelById) {
    return NextResponse.json({ error: 'Unsupported model' }, { status: 400 });
  }

  let body: string | Buffer;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
  };

  const model = await request.json();

  if (modelById.inputType === 'image' || modelById.inputType === 'audio') {
    const { base64 } = model;

    if (!base64) {
      return NextResponse.json({ error: 'No file found' }, { status: 400 });
    }

    body = Buffer.from(base64, 'base64');
    headers['Content-Type'] = 'application/octet-stream';
  } else {
    body = JSON.stringify(model);
    headers['Content-Type'] = 'application/json';
  }

  try {
    const url = `https://api-inference.huggingface.co/models/${modelById.baseModel}`;
    const response = await fetchModelResponse(url, headers, body);

    if (modelById.id === 'text-to-speech') {
      return await handleBlobResponse(response);
    } else {
      return await handleJsonResponse(response);
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 },
    );
  }
}
