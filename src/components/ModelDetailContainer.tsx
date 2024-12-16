'use client';

import { useState } from 'react';
import TextInputSection from './TextInputSection';
import { IModel } from '@/types';
import ImageUploadSection from './ImageUploadSection';
import AudioUploadSection from './AudioUploadSection';

interface Props {
  modelById: IModel;
}

export default function ModelDetailContainer({ modelById }: Props) {
  const [value, setValue] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const inputType = modelById.inputType;

  const handleSubmit = async () => {
    const data = inputType === 'text' ? value : file;

    console.log('data: ', data);
  };

  return (
    <div className="space-y-6">
      {inputType === 'text' && (
        <TextInputSection
          value={value}
          isLoading={isLoading}
          onInputChange={setValue}
          onSubmit={handleSubmit}
        />
      )}
      {inputType === 'image' && (
        <ImageUploadSection
          file={file}
          isLoading={isLoading}
          onFileChange={setFile}
          onSubmit={handleSubmit}
        />
      )}
      {inputType === 'audio' && (
        <AudioUploadSection
          file={file}
          isLoading={isLoading}
          onFileChange={setFile}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
