import { ethers } from 'ethers';
import ComicNFTABI from '@/abi/ComicNFT.json';

export async function mintNFT(ipfsUrl: string): Promise<string> {
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

    const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_COMIC_NFT_ADDRESS!,
        ComicNFTABI.abi,
        signer
    );

    const tx = await contract.mintNFT(signer.address, ipfsUrl);
    await tx.wait();
    return tx.hash;
} 