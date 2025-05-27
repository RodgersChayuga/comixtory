'use client';

import { useStore } from '@/lib/zustandStore';

export default function ComicPreview() {
    const { comicPanels } = useStore();

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">🖼️ Comic Preview</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {comicPanels.map((src, i) => (
                    <img key={i} src={src} alt={`panel-${i}`} className="w-full rounded shadow" />
                ))}
            </div>
        </div>
    );
}
