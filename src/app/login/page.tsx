"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  const handleLoginSuccess = () => {
    router.push('/');
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <AuthForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}
