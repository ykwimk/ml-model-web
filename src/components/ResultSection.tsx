import HorizontalBarChart from './HorizontalBarChart';
import { ModelResultType } from '@/types';

interface Props {
  result: ModelResultType;
}

export default function ResultSection({ result }: Props) {
  const renderResult = (result: ModelResultType) => {
    if (typeof result === 'string') {
      return <p className="text-gray-800">{result}</p>;
    }

    if (Array.isArray(result)) {
      return <HorizontalBarChart data={result} />;
    }

    return result;
  };

  return (
    <div className="rounded border bg-green-50 p-4">
      <h4 className="mb-2 font-medium">결과:</h4>
      {renderResult(result)}
    </div>
  );
}
