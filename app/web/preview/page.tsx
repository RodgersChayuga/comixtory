// File: app/comic-preview/page.tsx
'use client';

import { useStore } from '@/lib/zustandStore';
import { generateComicPanels } from '@/lib/replicate';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PreviewComicPage() {
    const {
        story,
        characters,
        comicPanels,
        setComicPanels,
    } = useStore();

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!story || characters.length === 0) {
            router.push('/input-story');
        } else if (comicPanels.length === 0) {
            generatePanels();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const generatePanels = async () => {
        try {
            setLoading(true);
            const panels = await generateComicPanels(story, characters);
            setComicPanels(panels);
        } catch (error) {
            console.error('Error generating panels:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleContinue = () => {
        router.push('/checkout');
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Comic Preview</h1>

            {loading && (
                <p className="text-center text-blue-600 font-medium animate-pulse">Generating your comic panels...</p>
            )}

            {!loading && comicPanels.length > 0 && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                        {comicPanels.map((panel: string, index: number) => (
                            <div key={index} className="rounded overflow-hidden border shadow">
                                <img src={panel} alt={`Comic Panel ${index + 1}`} className="w-full h-64 object-cover" />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={handleContinue}
                            className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
