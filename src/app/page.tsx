export default function Page() {
  const models = [
    { id: 0, name: 'AAAA', description: 'aaaa' },
    { id: 1, name: 'BBBB', description: 'bbbb' },
    { id: 2, name: 'CCCC', description: 'cccc' },
    { id: 3, name: 'DDDD', description: 'dddd' },
    { id: 4, name: 'EEEE', description: 'eeee' },
  ];

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold">ML Models Demo Web</h1>
        <p className="mt-2 text-gray-600">
          다양한 머신러닝 모델 데모를 체험해보세요.
        </p>
      </section>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {models.map((model) => (
          <div key={model.id}>
            <div>{model.name}</div>
            <div>{model.description}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
