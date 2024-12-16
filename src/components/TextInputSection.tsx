import React from 'react';

interface Props {
  value: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
}

export default function InputSection({
  value,
  isLoading,
  onInputChange,
  onSubmit,
}: Props) {
  return (
    <div className="space-y-2">
      <textarea
        id="textarea"
        className="h-64 w-full resize-none rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="텍스트를 입력하거나 이미지를 업로드하세요."
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onInputChange(e.target.value)
        }
      />
      <button
        type="button"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        disabled={isLoading || !value.trim()}
        onClick={onSubmit}
      >
        {isLoading ? '분석중...' : '분석하기'}
      </button>
    </div>
  );
}
