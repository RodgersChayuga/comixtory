// apps/web/app/characters.tsx

'use client';

import { useStore } from '@/lib/zustandStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { Character } from '@/lib/zustandStore';

export default function CharactersPage() {
    const { characters, setCharacters } = useStore();
    const router = useRouter();

    const [localCharacters, setLocalCharacters] = useState<Character[]>([
        { name: '', description: '', image: undefined, role: '' },
    ]);

    const handleChange = (index: number, field: string, value: string | File | null) => {
        const updated = [...localCharacters];
        // @ts-ignore
        updated[index][field] = value;
        setLocalCharacters(updated);
    };

    const addCharacter = () => {
        setLocalCharacters([...localCharacters, { name: '', description: '', image: undefined, role: '' }]);
    };

    const removeCharacter = (index: number) => {
        const updated = localCharacters.filter((_, i) => i !== index);
        setLocalCharacters(updated);
    };

    const handleNext = () => {
        const valid = localCharacters.every((char) => char.name?.trim() && char.description?.trim());
        if (!valid) return alert('Please fill in all character fields.');
        setCharacters(localCharacters);
        router.push('/upload-images');
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Define Your Characters</h1>

            {localCharacters.map((char, index) => (
                <div key={index} className="mb-6 border p-4 rounded-lg shadow-sm bg-white">
                    <label className="block text-sm font-medium">Character Name</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded mb-3"
                        value={char.name}
                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                    />

                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        className="w-full p-2 border rounded mb-3"
                        value={char.description}
                        onChange={(e) => handleChange(index, 'description', e.target.value)}
                    />

                    <label className="block text-sm font-medium">Image (optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="mb-3"
                        onChange={(e) => handleChange(index, 'image', e.target.files?.[0] ?? null)}
                    />

                    {localCharacters.length > 1 && (
                        <button
                            type="button"
                            className="text-red-600 text-sm"
                            onClick={() => removeCharacter(index)}
                        >
                            Remove Character
                        </button>
                    )}
                </div>
            ))}

            <div className="flex justify-between items-center">
                <button
                    type="button"
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded"
                    onClick={addCharacter}
                >
                    + Add Character
                </button>

                <button
                    type="button"
                    className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                    onClick={handleNext}
                >
                    Next: Upload Images
                </button>
            </div>
        </div>
    );
}
