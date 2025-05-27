import { NextResponse } from 'next/server';
import { getContract } from '@/lib/contracts'; // Assume a wrapper for interacting

export async function POST(req: Request) {
    try {
        const { tokenId, price } = await req.json();
        const contract = await getContract('Marketplace');

        const tx = await contract.listNFT(tokenId, price);
        await tx.wait();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Listing NFT failed:', error);
        return NextResponse.json({ error: 'Listing failed' }, { status: 500 });
    }
}