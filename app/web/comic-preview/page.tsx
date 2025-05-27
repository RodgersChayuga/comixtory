// File: app/comic-preview/page.tsx
'use client';

import { useEffect, useState } from 'react';

interface Panel {
    panel: number;
    narration?: string;
    dialogues: { character: string; text: string }[];
}

export default function ComicPreview() {
    const [panels, setPanels] = useState<Panel[]>([]);
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('generatedComic');
        if (saved) {
            const parsed = JSON.parse(saved);
            setPanels(parsed.panels);
            setImages(parsed.images);
        }
    }, []);

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-3xl font-bold text-center">Your Comic Preview</h1>

            {panels.map((panel, i) => (
                <div
                    key={i}
                    className="bg-white shadow-xl rounded-2xl overflow-hidden border"
                >
                    <img src={images[i]} alt={`Panel ${i + 1}`} className="w-full h-auto" />

                    <div className="p-4 space-y-2">
                        {panel.narration && (
                            <p className="italic text-gray-600">{panel.narration}</p>
                        )}
                        <div className="space-y-1">
                            {panel.dialogues.map((d, idx) => (
                                <p key={idx}>
                                    <span className="font-semibold text-indigo-600">{d.character}:</span>{' '}
                                    {d.text}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
