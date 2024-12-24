import { NextResponse } from 'next/server';
import { MODELS } from '@/constants';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ modelId: string }> },
) {
  const { modelId } = await params;
  const model = MODELS.find((m) => m.id === modelId);

  if (!model) {
    return NextResponse.json({ error: 'Unsupported model' }, { status: 400 });
  }

  const apiKey = process.env.HUGGINGFACE_API_TOKEN;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'No API key configured' },
      { status: 500 },
    );
  }

  let body: string | Buffer;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
  };

  if (model.inputType === 'image') {
    const { base64 } = await request.json();

    if (!base64) {
      return NextResponse.json({ error: 'No file found' }, { status: 400 });
    }

    body = Buffer.from(base64, 'base64');
    headers['Content-Type'] = 'application/octet-stream';
  } else {
    body = await request.json();
    headers['Content-Type'] = 'application/json';
  }

  try {
    const URL = `https://api-inference.huggingface.co/models/${model.baseModel}`;
    const response = await fetch(URL, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `API error: ${errorText}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json({ result: data });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 },
    );
  }
}
