interface Props {
  result: string;
}

export default function ResultSection({ result }: Props) {
  return (
    <div className="rounded border bg-green-50 p-4">
      <h4 className="mb-2 font-medium">결과:</h4>
      <p className="text-gray-800">{result}</p>
    </div>
  );
}
