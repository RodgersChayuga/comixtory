// apps/api/app/api/mint/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pinataSDK from '@pinata/sdk';
import { mintNFT } from '@/lib/blockchain'; // Your minting logic here

const pinata = new pinataSDK(process.env.PINATA_KEY!, process.env.PINATA_SECRET!);

export async function POST(req: NextRequest) {
    try {
        const { title, panels, description } = await req.json();

        // Pin metadata JSON to IPFS via Pinata
        const metadata = {
            name: title,
            description: description || "A comic NFT generated on PhysioChain",
            panels,
        };

        const result = await pinata.pinJSONToIPFS(metadata);

        // Mint NFT on blockchain with IPFS metadata URI
        const ipfsUrl = `ipfs://${result.IpfsHash}`;
        const txHash = await mintNFT(ipfsUrl);

        return NextResponse.json({ txHash, ipfsUrl });
    } catch (error) {
        console.error('Mint API error:', error);
        return NextResponse.json({ error: 'Minting failed' }, { status: 500 });
    }
}
