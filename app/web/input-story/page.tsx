'use client';
import { useState } from 'react';
import { useComicStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from "next/navigation";

export default function InputStoryPage() {
    const { setStory, setCharacters } = useComicStore();
    const [storyText, setStoryText] = useState('');
    const [characterNames, setCharacterNames] = useState<string[]>(['']);
    const router = useRouter()

    const handleSave = () => {
        setStory(storyText);
        setCharacters(characterNames.map((name) => ({ name, image: null })));
        alert('Story and characters saved! Proceed to image upload.');
        router.push("/web/image-upload")
    };

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-4">
            <h2 className="text-xl font-semibold">Enter Story</h2>
            <Textarea
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
                placeholder="Type your short story here..."
                rows={6}
            />

            <h3 className="text-lg font-semibold mt-4">Character Names</h3>
            {characterNames.map((name, idx) => (
                <Input
                    key={idx}
                    className="mb-2"
                    value={name}
                    onChange={(e) => {
                        const newNames = [...characterNames];
                        newNames[idx] = e.target.value;
                        setCharacterNames(newNames);
                    }}
                    placeholder={`Character ${idx + 1}`}
                />
            ))}
            <Button onClick={() => setCharacterNames([...characterNames, ''])} variant="outline">
                + Add Character
            </Button>

            <div className="pt-4">
                <Button onClick={handleSave}>Save & Continue</Button>
            </div>
        </div>
    );
}
