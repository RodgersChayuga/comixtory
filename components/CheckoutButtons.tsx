'use client';

import { useRouter } from 'next/navigation';

export default function CheckoutButtons({ onStripeCheckout }: { onStripeCheckout: () => void }) {
    const router = useRouter();

    return (
        <div className="flex gap-4 mt-6">
            <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={onStripeCheckout}
            >
                💳 Pay with Stripe
            </button>
            <button
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                onClick={() => router.push('/mint')}
            >
                🪙 Mint with Crypto
            </button>
        </div>
    );
}