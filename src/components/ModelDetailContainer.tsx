'use client';

import { useState, useTransition } from 'react';
import TextInputSection from './TextInputSection';
import { IModel } from '@/types';
import ImageUploadSection from './ImageUploadSection';
import AudioUploadSection from './AudioUploadSection';
import LoadingSpinner from './LoadingSpinner';
import ResultSection from './ResultSection';
import { modelResultKey } from '@/constants';
import ErrorModal from './ErrorModal';

interface Props {
  modelById: IModel;
}

export default function ModelDetailContainer({ modelById }: Props) {
  const [text, setText] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<string | [] | null>(null);

  const [isPending, startTransition] = useTransition();

  const inputType = modelById.inputType;

  const handleSubmit = () => {
    startTransition(async () => {
      const response = await fetch(`/api/models/${modelById.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(text),
      });

      const data = await response.json();
      console.log('data: ', data);
      const id = modelById.id;
      const modelResultKeyById = modelResultKey[id];

      if (data.error) {
        setError(data.error);
        return;
      }

      const result =
        modelResultKeyById === 'sentiment-analysis'
          ? data.result[0]
          : data.result[0][modelResultKeyById];

      setResult(result);
    });
  };

  return (
    <div className="space-y-6">
      {inputType === 'text' && (
        <TextInputSection
          text={text}
          isLoading={isPending}
          onInputChange={setText}
          onSubmit={handleSubmit}
        />
      )}
      {inputType === 'image' && (
        <ImageUploadSection
          file={file}
          isLoading={isPending}
          onFileChange={setFile}
          onSubmit={handleSubmit}
        />
      )}
      {inputType === 'audio' && (
        <AudioUploadSection
          file={file}
          isLoading={isPending}
          onFileChange={setFile}
          onSubmit={handleSubmit}
        />
      )}
      {isPending ? (
        <LoadingSpinner />
      ) : (
        result && <ResultSection result={result} />
      )}
      <ErrorModal
        isOpen={!!error}
        errorMessage={error}
        onClose={() => setError('')}
      />
    </div>
  );
}
