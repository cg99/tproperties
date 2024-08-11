"use client";

import Link from 'next/link';

export default function about() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">This is about page</h1>
      </div>
    </div>
  );
}
