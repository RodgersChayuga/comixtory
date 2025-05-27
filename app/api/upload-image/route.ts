import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import { uploadToIPFS } from '@/lib/pinata';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: Request) {
    try {
        const data = await new Promise<{ file: string }>((resolve, reject) => {
            const form = formidable({ multiples: false });
            form.parse(req as any, async (err, fields, files) => {
                if (err || !files.file) return reject(err);

                const file = files.file[0];
                const stream = fs.createReadStream(file.filepath);
                const result = await uploadToIPFS(stream);
                resolve({ file: result });
            });
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
}