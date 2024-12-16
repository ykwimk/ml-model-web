import ModelCard from '@/components/ModelCard';
import { MODELS } from '@/constants';

export default function Page() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold">ML Models Demo Web</h1>
        <p className="mt-2 text-gray-600">
          다양한 머신러닝 모델 데모를 체험해보세요.
        </p>
      </section>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {MODELS.map((model) => (
          <ModelCard
            key={model.id}
            modelId={model.id}
            name={model.name}
            caption={model.caption}
          />
        ))}
      </section>
    </div>
  );
}
