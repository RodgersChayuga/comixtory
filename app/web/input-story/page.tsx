// apps/web/app/input-story.tsx

'use client';

import { useStore } from '@/lib/zustandStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function InputStoryPage() {
    const [localStory, setLocalStory] = useState('');
    const { setStory } = useStore();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!localStory.trim()) return;
        setStory(localStory.trim());
        router.push('/characters');
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6 text-center">Tell Your Story</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Once upon a time in Nairobi... 🏙️"
                    value={localStory}
                    onChange={(e) => setLocalStory(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                    Next: Add Characters
                </button>
            </form>
        </div>
    );
}
