import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ML Model Demo Web',
  description: 'Machine-Learning Model Demo Web',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
        <Header />
        <main className="mx-auto w-full max-w-5xl flex-1 p-4 md:p-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
