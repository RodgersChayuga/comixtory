import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateComicScript(story: string, characterNames: string[]) {
    const prompt = `
You are a comic screenwriter. Turn the story below into a JSON array of comic panels. 
Each panel should have:
- narration (optional)
- a list of dialogues, each with "character" and "text"

Ensure only characters: ${characterNames.join(', ')} are used.

Story: """${story}"""
`;

    const res = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        response_format: { type: "json_object" },
    });

    const output = res.choices[0].message.content;
    return JSON.parse(output || '[]');
}


export async function generateComicImage(panel: string, panelIndex: number): Promise<string> {
    const res = await openai.images.generate({
        model: 'dall-e-3',
        prompt: `Comic panel ${panelIndex + 1}: ${panel}`,
        size: '1024x1024',
        n: 1,
        response_format: 'url',
    });

    if (!res.data?.[0]?.url) {
        throw new Error('Failed to generate image');
    }
    return res.data[0].url;
}
