// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is ReentrancyGuard, Ownable {
    struct Listing {
        address seller;
        address nftAddress;
        uint256 tokenId;
        uint256 price;
        bool isSold;
    }

    uint256 public listingId;
    mapping(uint256 => Listing) public listings;

    event ComicListed(uint256 indexed id, address indexed seller, address indexed nftAddress, uint256 tokenId, uint256 price);
    event ComicSold(uint256 indexed id, address buyer);

    function listComic(address nftAddress, uint256 tokenId, uint256 price) external nonReentrant {
        require(price > 0, "Price must be greater than 0");
        IERC721(nftAddress).transferFrom(msg.sender, address(this), tokenId);

        listings[listingId] = Listing(msg.sender, nftAddress, tokenId, price, false);
        emit ComicListed(listingId, msg.sender, nftAddress, tokenId, price);
        listingId++;
    }

    function buyComic(uint256 _listingId) external payable nonReentrant {
        Listing storage listing = listings[_listingId];
        require(!listing.isSold, "Comic already sold");
        require(msg.value >= listing.price, "Insufficient payment");

        listing.isSold = true;
        payable(listing.seller).transfer(listing.price);
        IERC721(listing.nftAddress).transferFrom(address(this), msg.sender, listing.tokenId);

        emit ComicSold(_listingId, msg.sender);
    }

    function getListing(uint256 _listingId) external view returns (Listing memory) {
        return listings[_listingId];
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
