'use client';

import { useState } from 'react';

interface Props {
  file: File | null;
  isLoading: boolean;
  onFileChange: (file: File | null) => void;
  onSubmit: () => void;
}

export default function AudioUploadSection({
  file,
  isLoading,
  onFileChange,
  onSubmit,
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files[0]) {
      setPreview(URL.createObjectURL(files[0]));
      onFileChange(files[0]);
    } else {
      setPreview(null);
      onFileChange(null);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="audio/*"
        id="audio-upload"
        className="block w-full text-sm text-gray-500 file:mr-4 file:rounded file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
        onChange={handleFileUpload}
      />
      {preview && (
        <div className="flex justify-center">
          <audio controls src={preview} className="mt-2 w-full max-w-md">
            브라우저가 오디오 요소를 지원하지 않습니다.
          </audio>
        </div>
      )}
      <div className="flex space-x-4">
        <button
          type="button"
          className={`flex-1 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            isLoading || !file ? 'cursor-not-allowed opacity-50' : ''
          }`}
          disabled={isLoading || !file}
          onClick={onSubmit}
        >
          {isLoading ? '변환 중...' : '음성 분석'}
        </button>
      </div>
    </div>
  );
}
