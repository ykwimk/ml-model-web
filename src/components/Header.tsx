import Link from 'next/link';
import { FiGithub } from 'react-icons/fi';

export default function Header() {
  return (
    <header className="border-b bg-white px-4 py-4 md:px-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between md:max-w-full">
        <Link href="/" className="text-2xl">
          🤖
        </Link>
        <nav className="space-x-4">
          <Link
            href="https://github.com/ykwimk"
            target="_blank"
            className="block rounded-full bg-black p-2"
          >
            <FiGithub className="h-4 w-4 text-white" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
