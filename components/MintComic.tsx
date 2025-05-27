// components/MintComic.tsx
'use client';

import { useState } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import ComicNFT from '../abi/ComicNFT.json'; // ABI file

const CONTRACT_ADDRESS = '0xB62caA54E5d6b2BA069dd6A0A862f5e410DcFddC';

export default function MintComic({ ipfsUrl }: { ipfsUrl: string }) {
    const { address } = useAccount();
    const [minted, setMinted] = useState(false);

    const { writeContract, isPending } = useContractWrite();

    const handleMint = () => {
        if (!address) return;
        writeContract?.({
            abi: ComicNFT.abi,
            address: CONTRACT_ADDRESS as `0x${string}`,
            functionName: 'mintComic',
            args: [address, ipfsUrl]
        });
    };

    return (
        <div>
            <button
                disabled={!writeContract || isPending}
                onClick={handleMint}
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                {isPending ? 'Minting...' : 'Mint Comic NFT'}
            </button>
            {minted && <p className="text-green-700">Comic NFT minted!</p>}
        </div>
    );
}
