import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frontend Algo Lab",
  description: "An algorithm learning assistant for frontend engineers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link
              href="/"
              className="font-bold text-gray-900 text-lg hover:text-blue-600 transition-colors"
            >
              Frontend Algo Lab
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link
                href="/algorithms"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Algorithms
              </Link>
            </nav>
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
