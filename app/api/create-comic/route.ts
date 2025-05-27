// File: app/api/create-comic/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateComicScript, generateComicImage } from '@/lib/comicAi';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
    const formData = await req.formData();

    const story = formData.get('story') as string;
    const charactersRaw = formData.get('characters') as string;
    const characters = charactersRaw.split(',').map((name) => name.trim());

    // Get uploaded images and map to character names
    const imagesMap: Record<string, string> = {};
    for (const name of characters) {
        const file = formData.get(name) as File;
        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const filename = `${Date.now()}_${name}.png`;
            const filePath = path.join(process.cwd(), 'public/uploads', filename);
            await writeFile(filePath, buffer);
            imagesMap[name] = `/uploads/${filename}`;
        }
    }

    // Step 1: Turn story into structured script
    const comicPanels = await generateComicScript(story, characters);

    // Step 2: Generate image for each panel
    const imageUrls: string[] = [];
    for (const [index, panel] of comicPanels.entries()) {
        const panelText = panel.narration + '\n' + panel.dialogues.map((d: any) => `${d.character}: ${d.text}`).join('\n');
        const imageUrl = await generateComicImage(panelText, index);
        imageUrls.push(imageUrl);
    }

    return NextResponse.json({ panels: comicPanels, images: imageUrls });
}
