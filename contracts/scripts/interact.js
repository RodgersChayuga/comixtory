const hre = require("hardhat");

async function main() {
    const [deployer, user1, user2] = await hre.ethers.getSigners();

    // Get deployed contracts (update addresses after deployment)
    const comicNFTAddress = "YOUR_COMIC_NFT_ADDRESS";
    const marketplaceAddress = "YOUR_MARKETPLACE_ADDRESS";

    const ComicNFT = await hre.ethers.getContractFactory("ComicNFT");
    const comicNFT = ComicNFT.attach(comicNFTAddress);

    const Marketplace = await hre.ethers.getContractFactory("Marketplace");
    const marketplace = Marketplace.attach(marketplaceAddress);

    // Mint NFT to user1
    const tokenURI = "ipfs://YOUR_METADATA_CID";
    const mintTx = await comicNFT.mint(user1.address, tokenURI);
    await mintTx.wait();
    console.log(`Minted NFT to ${user1.address}`);

    const tokenId = 1; // assuming first token minted has ID 1

    // user1 approves marketplace
    await comicNFT.connect(user1).approve(marketplaceAddress, tokenId);

    // user1 lists NFT on marketplace
    const price = hre.ethers.utils.parseEther("0.1");
    const listTx = await marketplace.connect(user1).listNFT(tokenId, price);
    await listTx.wait();
    console.log(`NFT ${tokenId} listed at price ${price.toString()}`);

    // user2 buys NFT
    const buyTx = await marketplace.connect(user2).buyNFT(tokenId, { value: price });
    await buyTx.wait();
    console.log(`NFT ${tokenId} bought by ${user2.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
