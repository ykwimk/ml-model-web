import BackButton from '@/components/BackButton';
import { use } from 'react';

interface Props {
  params: Promise<{ modelId: string }>;
}

export default function ModelDetailPage({ params }: Props) {
  const { modelId } = use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <BackButton />
        <h1 className="text-2xl font-bold capitalize">
          {modelId.replaceAll('-', ' ')}
        </h1>
      </div>
      <p className="text-gray-600">이 모델에 대한 간단한 설명 문구.</p>
    </div>
  );
}
