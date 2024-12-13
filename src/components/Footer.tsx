export default function Footer() {
  return (
    <footer className="mt-8 border-t bg-white p-4 text-center text-sm text-gray-500">
      <div className="mx-auto max-w-5xl">
        © {new Date().getFullYear()} ML Model Demo Web. All rights reserved by
        ykwimk.
      </div>
    </footer>
  );
}
