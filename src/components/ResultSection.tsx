import { ReactNode } from 'react';
import HorizontalBarChart from './HorizontalBarChart';

interface Props {
  result: string | Array<{ label: string; score: number }> | ReactNode;
}

export default function ResultSection({ result }: Props) {
  return (
    <div className="rounded border bg-green-50 p-4">
      <h4 className="mb-2 font-medium">결과:</h4>
      {typeof result === 'string' ? (
        <p className="text-gray-800">{result}</p>
      ) : Array.isArray(result) ? (
        <HorizontalBarChart data={result} />
      ) : (
        result
      )}
    </div>
  );
}
