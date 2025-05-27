// File: app/image-upload.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ImageUpload() {
    const router = useRouter();
    const [story, setStory] = useState('');
    const [characters, setCharacters] = useState<string[]>([]);
    const [images, setImages] = useState<Record<string, File | null>>({});

    useEffect(() => {
        const storedStory = localStorage.getItem('story');
        const storedCharacters = localStorage.getItem('characters');
        if (storedStory) setStory(storedStory);
        if (storedCharacters) {
            const chars = storedCharacters.split(',').map((c) => c.trim());
            setCharacters(chars);
            const imgMap: Record<string, File | null> = {};
            chars.forEach((name) => (imgMap[name] = null));
            setImages(imgMap);
        }
    }, []);

    const handleFileChange = (name: string, file: File | null) => {
        setImages((prev) => ({ ...prev, [name]: file }));
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('story', story);
        formData.append('characters', characters.join(','));
        for (const name of characters) {
            const file = images[name];
            if (file) {
                formData.append(name, file);
            }
        }

        const res = await fetch('/api/create-comic', {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            const data = await res.json();
            localStorage.setItem('generatedComic', JSON.stringify(data));
            router.push('/comic-preview');
        } else {
            alert('Comic generation failed.');
        }
    };

    return (
        <div className="p-6 space-y-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold">Upload Character Images</h1>
            {characters.map((name) => (
                <div key={name} className="flex flex-col space-y-2">
                    <label className="font-medium">{name}</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(name, e.target.files?.[0] || null)}
                    />
                </div>
            ))}
            <button
                onClick={handleSubmit}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
                Create Comic
            </button>
        </div>
    );
}
