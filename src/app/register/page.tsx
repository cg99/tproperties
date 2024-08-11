"use client";

import { useRouter } from 'next/navigation';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  const router = useRouter();

  const handleRegisterSuccess = () => {
    router.push('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
    </div>
  );
}
