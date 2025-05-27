'use client';

import { useEffect, useState } from 'react';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import MarketplaceABI from '@/abi/Marketplace.json';
import ComicNFTABI from '@/abi/ComicNFT.json';
import axios from 'axios';
import Image from 'next/image';
import { formatEther, parseEther } from 'viem';

const MARKETPLACE_ADDRESS = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS!;
const NFT_ADDRESS = process.env.NEXT_PUBLIC_COMIC_NFT_ADDRESS!;

export default function MarketplacePage() {
    const [listings, setListings] = useState<any[]>([]);
    const { address, isConnected } = useAccount();

    // Fetch all active listings
    const { data: rawListings } = useContractRead({
        address: MARKETPLACE_ADDRESS as `0x${string}`,
        abi: MarketplaceABI.abi,
        functionName: 'getListings',
        query: {
            refetchInterval: 2000
        }
    });

    useEffect(() => {
        const fetchMetadata = async () => {
            if (!rawListings) return;

            const results = await Promise.all(
                (rawListings as any[]).map(async (listing: any) => {
                    try {
                        const res = await axios.get(`https://ipfs.io/ipfs/${listing.tokenURI.split('ipfs://')[1]}`);
                        return {
                            ...listing,
                            metadata: res.data,
                        };
                    } catch {
                        return listing;
                    }
                })
            );

            setListings(results);
        };

        fetchMetadata();
    }, [rawListings]);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">📚 HekaHeka Marketplace</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {listings.map((listing, idx) => (
                    <NFTCard key={idx} listing={listing} buyer={address} />
                ))}
            </div>
        </div>
    );
}

// ----------------------------
// 💳 NFT Card Component
// ----------------------------
function NFTCard({ listing, buyer }: { listing: any; buyer: string | undefined }) {
    const { seller, tokenId, price, metadata } = listing;

    const { writeContract, isPending, isSuccess } = useContractWrite();

    const handleBuy = () => {
        writeContract?.({
            address: MARKETPLACE_ADDRESS as `0x${string}`,
            abi: MarketplaceABI.abi,
            functionName: 'buyNFT',
            args: [NFT_ADDRESS, tokenId],
            value: price,
        });
    };

    return (
        <div className="border rounded-xl shadow p-4 bg-white space-y-4">
            {metadata?.image ? (
                <Image
                    src={metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
                    alt="Comic cover"
                    width={400}
                    height={400}
                    className="rounded-lg object-cover w-full h-64"
                />
            ) : (
                <div className="bg-gray-100 w-full h-64 rounded-lg animate-pulse" />
            )}

            <div className="text-left">
                <h2 className="text-lg font-semibold">{metadata?.name || 'HekaHeka Comic'}</h2>
                <p className="text-gray-600 text-sm mb-2">{metadata?.description?.slice(0, 100)}...</p>
                <p className="font-bold text-purple-700">Ξ {formatEther(price)}</p>
                <button
                    disabled={!writeContract || isPending}
                    onClick={handleBuy}
                    className="mt-2 w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
                >
                    {isPending ? 'Processing...' : isSuccess ? 'Purchased ✅' : 'Buy Now'}
                </button>
            </div>
        </div>
    );
}
