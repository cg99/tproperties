"use client";

import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!}`);

export default function SubscriptionForm({ priceId }: { priceId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);

    const response = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    });

    const { id } = await response.json();
    const stripe = await stripePromise;

    if (stripe) {
      stripe.redirectToCheckout({ sessionId: id });
    }
  };

  return (
    <button
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      onClick={handleSubscribe}
      disabled={loading}
    >
      Subscribe
    </button>
  );
}
