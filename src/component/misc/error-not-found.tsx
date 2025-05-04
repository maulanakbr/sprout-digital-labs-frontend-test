import Link from 'next/link';
import * as React from 'react';

interface ErrorNotFoundProps {
  message: React.ReactNode;
}

export default function ErrorNotFound({ message }: ErrorNotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-100 to-white text-center px-4">
      <div className="text-6xl mb-4">💥</div>
      <h1 className="text-2xl font-bold text-red-600 mb-2">Oops! Something went wrong.</h1>
      <p className="text-gray-700 mb-6">{message}</p>
      <Link
        href="/"
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-200"
      >
        Go Back
      </Link>
    </div>
  );
}
