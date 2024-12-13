'use client';

import { useRouter } from 'next/navigation';
import { FaAngleLeft } from 'react-icons/fa6';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="rounded p-2 text-gray-700 transition hover:text-gray-900"
      onClick={() => router.back()}
    >
      <FaAngleLeft />
    </button>
  );
}
