// Enhanced Marketplace with dynamic buyNFT support + URI display

'use client';

import { useState, useEffect } from 'react';
import {
    useAccount,
    useContractRead,
    useContractWrite,
} from 'wagmi';
import ComicNFT from '@/abi/ComicNFT.json';
import MarketplaceABI from '@/abi/Marketplace.json';
import { parseEther } from 'viem';

const CONTRACT_ADDRESS = '0xB62caA54E5d6b2BA069dd6A0A862f5e410DcFddC';
const MARKETPLACE_ADDRESS = '0x3603326C24bB88Bd0F39E00a919088932112A86f';

export default function ComicMarketplace() {
    const { address } = useAccount();
    const [price, setPrice] = useState('0.01');
    const [listed, setListed] = useState(false);
    const [ownedTokenIds, setOwnedTokenIds] = useState<number[]>([]);
    const [listingTokenId, setListingTokenId] = useState<number | null>(null);
    const [selectedBuyToken, setSelectedBuyToken] = useState<number | null>(null);
    const [tokenURIs, setTokenURIs] = useState<{ [key: number]: string }>({});

    const { writeContract: approveWrite, isPending: isApproving } = useContractWrite();

    const { writeContract: buyWrite, isPending: isBuying } = useContractWrite();

    const { data: balanceOf } = useContractRead({
        address: CONTRACT_ADDRESS,
        abi: ComicNFT.abi,
        functionName: 'balanceOf',
        args: [address],
        query: {
            refetchInterval: 2000
        }
    });

    useEffect(() => {
        async function fetchOwnedTokens() {
            const balance = Number(balanceOf);
            const tokenIds: number[] = [];
            const uris: { [key: number]: string } = {};

            for (let i = 0; i < balance; i++) {
                const tokenIdResult = await useContractRead({
                    address: CONTRACT_ADDRESS,
                    abi: ComicNFT.abi,
                    functionName: 'tokenOfOwnerByIndex',
                    args: [address, i],
                });
                const tokenId = Number(tokenIdResult?.data);
                tokenIds.push(tokenId);

                const uriResult = await useContractRead({
                    address: CONTRACT_ADDRESS,
                    abi: ComicNFT.abi,
                    functionName: 'tokenURI',
                    args: [tokenId],
                });
                uris[tokenId] = (uriResult?.data as string) || '';
            }

            setOwnedTokenIds(tokenIds);
            setTokenURIs(uris);
        }

        if (address && balanceOf) fetchOwnedTokens();
    }, [balanceOf, address]);

    const handleList = (tokenId: number) => {
        setListingTokenId(tokenId);
        approveWrite?.({
            abi: ComicNFT.abi,
            address: CONTRACT_ADDRESS,
            functionName: 'approve',
            args: [MARKETPLACE_ADDRESS, tokenId],
        });
    };

    const handleBuy = (tokenId: number) => {
        setSelectedBuyToken(tokenId);
        buyWrite?.({
            abi: MarketplaceABI.abi,
            address: MARKETPLACE_ADDRESS,
            functionName: 'buyNFT',
            args: [CONTRACT_ADDRESS, tokenId],
            value: parseEther(price),
        });
    };

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border px-2 py-1 rounded"
                    placeholder="Enter price in ETH"
                />
                <button
                    onClick={() => handleList(ownedTokenIds[0])}
                    className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                    List Comic for Sale
                </button>
                {listed && <p className="text-green-600">Comic approved for listing!</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ownedTokenIds.map((id) => (
                    <div key={id} className="border p-4 rounded shadow">
                        <img
                            src={tokenURIs[id]?.startsWith('ipfs://') ? tokenURIs[id].replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/') : tokenURIs[id]}
                            alt={`Comic ${id}`}
                            className="rounded w-full"
                        />
                        <p className="mt-2 text-center">Token #{id}</p>
                        <button
                            className="mt-2 bg-blue-600 text-white px-3 py-1 rounded w-full"
                            onClick={() => handleBuy(id)}
                        >
                            Buy
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
