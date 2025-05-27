// type Character = {
//     name: string;
//     description: string;
//     image: File | null;
// };

// export async function generateComicPanels(story: string, characters: Character[]): Promise<string[]> {
//     // Assume you send `story + character traits` to Replicate model and return image URLs
//     const response = await fetch('/api/generate-comic', {
//         method: 'POST',
//         body: JSON.stringify({ story, characters }),
//         headers: { 'Content-Type': 'application/json' },
//     });

//     const { panels } = await response.json();
//     return panels; // array of image URLs
// }


import Replicate from 'replicate'

const replicate = new Replicate({ auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN! })

export async function generateComicPanels(story: string, characters: any[]): Promise<string[]> {
    const input = {
        prompt: `Comic story: ${story} featuring characters: ${characters.map(c => c.name).join(', ')}`,
        num_outputs: 4
    }
    const output = await replicate.run('your-model/your-version', { input })
    return output as string[]
}
