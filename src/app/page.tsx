"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">SaaS Boilerplate with Next.js</h1>
        <p className="mb-8 text-gray-600">A boilerplate for building SaaS applications with authentication, payments, and more.</p>
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto">
          {/* Your main content goes here */}
          hello from the other world
        </div>
      </div>
    </main>
  );
}
