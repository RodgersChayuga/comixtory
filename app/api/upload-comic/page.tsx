// pages/api/upload-comic.ts
import pinataSDK from '@pinata/sdk';
import { NextApiRequest, NextApiResponse } from 'next';

const pinata = new pinataSDK(process.env.PINATA_KEY!, process.env.PINATA_SECRET!);

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();

    try {
        const { panels, title } = req.body;

        const metadata = {
            name: title,
            description: "A comical NFT generated on PhysioChain",
            panels,
        };

        const result = await pinata.pinJSONToIPFS(metadata);
        res.status(200).json({ ipfsUrl: `ipfs://${result.IpfsHash}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Upload failed' });
    }
}
