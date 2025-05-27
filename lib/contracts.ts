import { ethers } from 'ethers';
import MarketplaceABI from '@/abi/Marketplace.json';

export async function getContract(contractName: string) {
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

    const contractAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS!;
    return new ethers.Contract(contractAddress, MarketplaceABI.abi, signer);
} 