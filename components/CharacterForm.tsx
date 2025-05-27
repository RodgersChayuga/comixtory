'use client';

import { useState } from 'react';
import { useStore } from '@/lib/zustandStore';

export default function CharacterForm() {
    const { characters, setCharacters } = useStore();
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    const addCharacter = () => {
        if (!name.trim() || !role.trim()) return;
        setCharacters([...characters, { name, role }]);
        setName('');
        setRole('');
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">🎭 Add Characters</h2>
            <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Character Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Role in story"
                value={role}
                onChange={(e) => setRole(e.target.value)}
            />
            <button
                onClick={addCharacter}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
                ➕ Add Character
            </button>
            <ul className="list-disc pl-5 mt-4">
                {characters.map((c, i) => (
                    <li key={i}>{c.name} – <em>{c.role}</em></li>
                ))}
            </ul>
        </div>
    );
}