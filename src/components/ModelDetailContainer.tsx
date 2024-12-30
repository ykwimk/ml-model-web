'use client';

import { useState, useTransition } from 'react';
import TextInputSection from './TextInputSection';
import { IModel, IResultData, ModelResultType } from '@/types';
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
  const [result, setResult] = useState<ModelResultType | null>(null);

  const [isPending, startTransition] = useTransition();

  const inputType = modelById.inputType;

  const processResult = async (
    response: Response,
    id: string,
  ): Promise<ModelResultType> => {
    if (id === 'text-to-speech') {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      return <audio src={url} controls />;
    }

    const data: IResultData = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    switch (id) {
      case 'sentiment-analysis':
        return data.result[0];
      case 'image-classifier':
      case 'object-detection':
        return data.result;
      case 'speech-to-text':
        return data.result[modelResultKey[id]];
      default:
        return data.result[0][modelResultKey[id]];
    }
  };

  const handleSubmit = () => {
    startTransition(async () => {
      try {
        const body =
          file && (inputType === 'image' || inputType === 'audio')
            ? JSON.stringify({ base64: await fileToBase64(file) })
            : JSON.stringify(text);

        const response = await fetch(`/api/models/${modelById.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        });

        const result = await processResult(response, modelById.id);
        setResult(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      }
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
