'use client';

import { useState } from 'react';
import InputSection from './InputSection';

interface Props {
  modelId: string;
}

export default function ModelDetailContainer({ modelId }: Props) {
  const [value, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    console.log('modelId: ', modelId);
  };

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
