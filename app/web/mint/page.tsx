'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/zustandStore';
import { useRouter } from 'next/navigation';
import { generateMetadataJSON } from '@/lib/metadata';
import { uploadToIPFS } from '@/lib/pinata';
import { useAccount, useWriteContract } from 'wagmi';
import ComicNFT from '@/abi/ComicNFT.json';
import MintSuccessDialog from '@/components/MintSuccessDialog';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_COMIC_NFT_ADDRESS!;

export default function MintPage() {
    const {
        story,
        comicPanels,
        paymentSuccess,
        setMintStatus,
        setNftUri,
    } = useStore();

    const [ipfsUri, setIpfsUri] = useState('');
    const [metadataReady, setMetadataReady] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { address } = useAccount();
    const { writeContract, isSuccess } = useWriteContract();

    useEffect(() => {
        if (!paymentSuccess) router.push('/checkout');
    }, [paymentSuccess, router]);

    useEffect(() => {
        const processMetadata = async () => {
            try {
                setLoading(true);
                const metadata = generateMetadataJSON(comicPanels, story);
                const uri = await uploadToIPFS(metadata);
                setIpfsUri(uri);
                setMetadataReady(true);
            } catch (err) {
                console.error('Metadata/IPFS upload failed:', err);
            } finally {
                setLoading(false);
            }
        };

        processMetadata();
    }, [comicPanels, story]);

    useEffect(() => {
        if (metadataReady && address && ipfsUri) {
            writeContract({
                address: CONTRACT_ADDRESS as `0x${string}`,
                abi: ComicNFT.abi,
                functionName: 'mintNFT',
                args: [address, ipfsUri],
            });
        }
    }, [metadataReady, writeContract, address, ipfsUri]);

    useEffect(() => {
        if (isSuccess && ipfsUri) {
            setMintStatus('success');
            setNftUri(ipfsUri);
        }
    }, [isSuccess, ipfsUri, setMintStatus, setNftUri]);

    return (
        <div className="max-w-2xl mx-auto p-6 text-center">
            <h1 className="text-3xl font-bold mb-4">Minting Your Comic NFT</h1>

            {loading && <p className="text-gray-600 mb-4">Uploading metadata to IPFS...</p>}

            {!loading && !isSuccess && (
                <p className="text-sm text-gray-500">Waiting for mint transaction confirmation...</p>
            )}

            {isSuccess && (
                <MintSuccessDialog
                    isOpen={true}
                    onClose={() => router.push('/marketplace')}
                    uri={ipfsUri}
                />
            )}
        </div>
    );
}
