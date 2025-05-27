import { create } from 'zustand';

interface ComicState {
    story: string;
    characters: { name: string; image: File | null }[];
    setStory: (story: string) => void;
    setCharacters: (characters: { name: string; image: File | null }[]) => void;
}

export const useComicStore = create<ComicState>((set) => ({
    story: '',
    characters: [],
    setStory: (story) => set({ story }),
    setCharacters: (characters) => set({ characters }),
}));