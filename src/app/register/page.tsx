"use client";

import { useRouter } from 'next/navigation';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  const router = useRouter();

  const handleRegisterSuccess = () => {
    router.push('/');
  };

  return (
    <>
      <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
    </>
  );
}
