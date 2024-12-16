import { use } from 'react';
import BackButton from '@/components/BackButton';
import ModelDetailContainer from '@/components/ModelDetailContainer';
import { MODELS } from '@/constants';

interface Props {
  params: Promise<{ modelId: string }>;
}

export default function ModelDetailPage({ params }: Props) {
  const { modelId } = use(params);

  const modelById = MODELS.find((model) => model.id === modelId);

  if (!modelById) {
    return (
      <div className="space-y-6">
        <BackButton />
        <h1 className="text-2xl font-bold">Model not found</h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <BackButton />
        <h1 className="text-2xl font-bold capitalize">
          {modelId.replaceAll('-', ' ')}
        </h1>
      </div>
      {modelById.description && (
        <p className="mt-2 break-keep text-gray-600">{modelById.description}</p>
      )}
      {modelById.baseModel && (
        <p className="mt-1 text-sm text-gray-500">
          Powered by:{' '}
          <span className="rounded bg-gray-100 p-0.5 font-mono">
            {modelById.baseModel}
          </span>
        </p>
      )}
      <ModelDetailContainer modelId={modelId} />
    </div>
  );
}
