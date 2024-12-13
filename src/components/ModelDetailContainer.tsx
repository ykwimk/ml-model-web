'use client';

import { useState } from 'react';
import InputSection from './InputSection';
import BackButton from './BackButton';

interface Props {
  modelId: string;
}

export default function ModelDetailContainer({ modelId }: Props) {
  const [value, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    console.log('submit!');
  };

  if (!modelId) {
    return (
      <div className="space-y-6">
        <BackButton />
        <h1 className="text-2xl font-bold">Model not found</h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <InputSection
        value={value}
        isLoading={isLoading}
        onInputChange={setInput}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
