import { ethers } from "hardhat";

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with:", deployer.address);

    // Deploy ComicNFT first
    const ComicNFT = await ethers.getContractFactory("ComicNFT");
    const comicNFT = await ComicNFT.deploy();
    await comicNFT.deployed();
    console.log("ComicNFT deployed to:", comicNFT.address);

    // Deploy Marketplace and pass ComicNFT address (optional)
    const Marketplace = await hre.ethers.getContractFactory("Marketplace");
    const marketplace = await Marketplace.deploy();
    await marketplace.deployed();
    console.log("Marketplace deployed to:", marketplace.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
