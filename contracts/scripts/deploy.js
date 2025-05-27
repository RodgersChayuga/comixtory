const hre = require("hardhat");

async function main() {
    const ComicNFT = await hre.ethers.getContractFactory("ComicNFT");
    const comicNFT = await ComicNFT.deploy();
    await comicNFT.deployed();
    console.log("ComicNFT deployed to:", comicNFT.address);

    const Marketplace = await hre.ethers.getContractFactory("Marketplace");
    const marketplace = await Marketplace.deploy(comicNFT.address);
    await marketplace.deployed();
    console.log("Marketplace deployed to:", marketplace.address);

    // Optionally: grant marketplace approval to manage NFTs
    const tx = await comicNFT.setApprovalForAll(marketplace.address, true);
    await tx.wait();

    console.log("Marketplace approved to transfer NFTs");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
