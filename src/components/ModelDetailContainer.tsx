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
import { fileToBase64 } from '@/utils';

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
      let body: string | File = JSON.stringify(text);

      if (file && (inputType === 'image' || inputType === 'audio')) {
        const base64 = await fileToBase64(file);

        body = JSON.stringify({ base64 });
      }

      const response = await fetch(`/api/models/${modelById.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      const id = modelById.id;
      const modelResultKeyById = modelResultKey[id];
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      let result;

      if (id === 'sentiment-analysis') {
        result = data.result[0];
      } else if (id === 'image-classifier' || id === 'object-detection') {
        result = data.result;
      } else if (id === 'speech-to-text') {
        result = data.result[modelResultKeyById];
      } else {
        result = data.result[0][modelResultKeyById];
      }

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
