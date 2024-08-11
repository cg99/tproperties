"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import SubscriptionForm from '@/components/SubscriptionForm';
import { useEffect } from 'react';

export default function PricingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login'); // Redirect to login page if not authenticated
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>; // Show a loading state while checking authentication
  }

  if (status === 'authenticated') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Choose Your Plan</h1>
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Premium Plan</h2>
          <SubscriptionForm priceId={`${process.env.NEXT_PUBLIC_STRIPE_PRICE_ID}`} />
        </div>
      </div>
    );
  }

  return null;
}
