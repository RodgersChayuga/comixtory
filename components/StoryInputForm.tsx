'use client';

import { useStore } from '../lib/zustandStore';

export default function StoryInputForm() {
    const { story, setStory } = useStore();

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">📖 Enter Story</h2>
            <textarea
                className="w-full border px-3 py-2 rounded h-40"
                placeholder="Write your story here..."
                value={story}
                onChange={(e) => setStory(e.target.value)}
            />
        </div>
    );
}