import { type ReactNode } from "react";

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <header className="bg-red-600 text-white py-4 shadow-md">
        <div className="container mx-auto text-2xl font-bold">TailorIQ</div>
      </header>

      <main className="container mx-auto py-10 px-4">
        {children}
      </main>

      <footer className="bg-gray-900 text-white py-6 mt-20 text-center">
        &copy; 2025 TailorIQ. All rights reserved.
      </footer>
    </div>
  );
}
