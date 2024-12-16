import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

interface Props {
  modelId: string;
  name: string;
  caption: string;
}

export default function ModelCard({ modelId, name, caption }: Props) {
  return (
    <Link
      className="block rounded-lg border bg-white p-4 transition hover:shadow-lg"
      href={`/models/${modelId}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="mt-1 break-keep text-gray-600">{caption}</p>
        </div>
        <span className="mt-2 inline-block text-gray-400 hover:underline">
          <FaArrowRight />
        </span>
      </div>
    </Link>
  );
}
