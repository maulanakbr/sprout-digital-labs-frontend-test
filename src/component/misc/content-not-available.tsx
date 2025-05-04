'use client';

import Link from 'next/link';

export default function ContentNotAvailable() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center px-4">
      <div className="text-5xl mb-4">😕</div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Content Not Available</h2>
      <p className="text-gray-500 mb-6">
        Sorry, this section seems to be empty or unavailable right now.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
}
