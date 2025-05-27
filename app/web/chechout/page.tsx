'use client';

import { useStore } from '@/lib/zustandStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CheckoutPage() {
    const {
        story,
        characters,
        comicPanels,
        setPaymentSuccess,
    } = useStore();

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!story || comicPanels.length === 0) {
            router.push('/preview');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleStripeCheckout = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/checkout/stripe', {
                story,
                characters,
                comicPanels,
            });

            const { sessionUrl } = response.data;
            window.location.href = sessionUrl; // Redirect to Stripe Checkout
        } catch (error) {
            console.error('Stripe checkout error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCryptoCheckout = () => {
        // Simulate success or do it after actual crypto transaction
        setPaymentSuccess(true);
        router.push('/mint');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Story Summary</h2>
                <p className="bg-gray-100 p-4 rounded">{story}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {comicPanels.map((img, index) => (
                    <img key={index} src={img} alt={`Panel ${index + 1}`} className="rounded shadow" />
                ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                    onClick={handleStripeCheckout}
                    className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 disabled:opacity-60"
                    disabled={loading}
                >
                    {loading ? 'Redirecting...' : 'Pay with Card (Stripe)'}
                </button>

                <button
                    onClick={handleCryptoCheckout}
                    className="bg-purple-600 text-white py-2 px-6 rounded hover:bg-purple-700"
                >
                    Pay with Crypto
                </button>
            </div>
        </div>
    );
}
