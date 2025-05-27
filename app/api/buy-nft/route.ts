import { NextResponse } from 'next/server';
import { getContract } from '@/lib/contracts';

export async function POST(req: Request) {
    try {
        const { tokenId, price } = await req.json();
        const contract = await getContract('Marketplace');

        const tx = await contract.buyNFT(tokenId, { value: price });
        await tx.wait();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Buying NFT failed:', error);
        return NextResponse.json({ error: 'Buy failed' }, { status: 500 });
    }
}