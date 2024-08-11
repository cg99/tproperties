"use client";

import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-6 text-green-600">Success!</h1>
        <p className="mb-8 text-gray-700">Thank you for your subscription. Your payment was successful.</p>
        <Link href="/" className="text-blue-500 hover:text-blue-700">Go back to Home</Link>
      </div>
    </div>
  );
}
