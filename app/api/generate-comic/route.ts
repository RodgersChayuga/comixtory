// apps/api/app/api/generate-comic/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateComicScript, generateComicImage } from '@/lib/comicAi';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const story = formData.get('story') as string;
        const charactersRaw = formData.get('characters') as string;
        const characters = charactersRaw.split(',').map((name) => name.trim());

        // Save uploaded images and map them by character name
        const imagesMap: Record<string, string> = {};
        for (const name of characters) {
            const file = formData.get(name) as File | null;
            if (file) {
                const buffer = Buffer.from(await file.arrayBuffer());
                const filename = `${Date.now()}_${name}.png`;
                const filePath = path.join(process.cwd(), 'public/uploads', filename);
                await writeFile(filePath, buffer);
                imagesMap[name] = `/uploads/${filename}`;
            }
        }

        // Generate structured comic script based on story and characters
        const comicPanels = await generateComicScript(story, characters);

        // Generate an image URL for each panel
        const imageUrls: string[] = [];
        for (const [index, panel] of comicPanels.entries()) {
            const panelText =
                panel.narration +
                '\n' +
                panel.dialogues.map((d: any) => `${d.character}: ${d.text}`).join('\n');

            const imageUrl = await generateComicImage(panelText, index);
            imageUrls.push(imageUrl);
        }

        return NextResponse.json({ panels: comicPanels, images: imageUrls, imagesMap });
    } catch (error) {
        console.error('Error generating comic:', error);
        return NextResponse.json({ error: 'Failed to generate comic' }, { status: 500 });
    }
}
