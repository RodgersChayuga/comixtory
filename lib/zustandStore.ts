import { create } from 'zustand'

export type Character = {
    name?: string;
    description?: string;
    role?: string;
    image?: File | string;
};

interface StoreState {
    story: string
    characters: Character[]
    images: File[]
    comicPanels: string[]
    paymentSuccess: boolean
    mintStatus: 'idle' | 'pending' | 'success' | 'failed'
    nftUri: string

    setStory: (story: string) => void
    addCharacter: (character: Character) => void
    setCharacters: (characters: Character[]) => void
    setImages: (images: File[]) => void
    setComicPanels: (panels: string[]) => void
    setPaymentSuccess: (success: boolean) => void
    setMintStatus: (status: StoreState['mintStatus']) => void
    setNftUri: (uri: string) => void
}

export const useStore = create<StoreState>((set) => ({
    story: '',
    characters: [],
    images: [],
    comicPanels: [],
    paymentSuccess: false,
    mintStatus: 'idle',
    nftUri: '',

    setStory: (story) => set({ story }),
    addCharacter: (character) => set((state) => ({ characters: [...state.characters, character] })),
    setCharacters: (characters) => set({ characters }),
    setImages: (images) => set({ images }),
    setComicPanels: (panels) => set({ comicPanels: panels }),
    setPaymentSuccess: (success) => set({ paymentSuccess: success }),
    setMintStatus: (status) => set({ mintStatus: status }),
    setNftUri: (uri) => set({ nftUri: uri })
}))