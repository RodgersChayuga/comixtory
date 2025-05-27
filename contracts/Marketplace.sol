// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./ComicNFT.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {
    ComicNFT public comicNFT;
    address payable public owner;
    uint256 public feePercent = 2; // marketplace fee

    struct Listing {
        address seller;
        uint256 price;
        bool active;
    }

    // tokenId => Listing
    mapping(uint256 => Listing) public listings;

    event Listed(uint256 tokenId, address seller, uint256 price);
    event Sale(uint256 tokenId, address buyer, uint256 price);

    constructor(address _comicNFT) {
        comicNFT = ComicNFT(_comicNFT);
        owner = payable(msg.sender);
    }

    function listNFT(uint256 tokenId, uint256 price) external {
        require(comicNFT.ownerOf(tokenId) == msg.sender, "Not owner");
        require(price > 0, "Price must be > 0");
        comicNFT.transferFrom(msg.sender, address(this), tokenId);

        listings[tokenId] = Listing(msg.sender, price, true);

        emit Listed(tokenId, msg.sender, price);
    }

    function buyNFT(uint256 tokenId) external payable nonReentrant {
        Listing memory item = listings[tokenId];
        require(item.active, "Not listed");
        require(msg.value >= item.price, "Insufficient payment");

        listings[tokenId].active = false;

        // Marketplace fee
        uint256 fee = (msg.value * feePercent) / 100;
        uint256 sellerAmount = msg.value - fee;

        // Pay seller
        payable(item.seller).transfer(sellerAmount);
        // Pay marketplace owner
        owner.transfer(fee);

        // Transfer NFT to buyer
        comicNFT.transferFrom(address(this), msg.sender, tokenId);

        emit Sale(tokenId, msg.sender, msg.value);
    }

    function cancelListing(uint256 tokenId) external {
        Listing memory item = listings[tokenId];
        require(item.seller == msg.sender, "Not seller");
        require(item.active, "Not active listing");

        listings[tokenId].active = false;

        // Return NFT to seller
        comicNFT.transferFrom(address(this), msg.sender, tokenId);
    }
}
