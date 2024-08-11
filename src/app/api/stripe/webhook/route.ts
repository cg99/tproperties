// /app/api/stripe/webhook/route.ts
import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import Stripe from 'stripe';

export async function POST(req: Request) {
    const sig = req.headers.get('stripe-signature')!;
    const payload = await req.text();

    try {
        const event = stripe.webhooks.constructEvent(
            payload,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;
            // Handle successful subscription here
        }

        return NextResponse.json({ received: true });
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 400 });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 400 });
        }
    }
}
