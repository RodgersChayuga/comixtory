// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ComicNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("Comixtory Comic", "COMIC") {
        tokenCounter = 0;
    }

    function mintComic(address to, string memory tokenURI) external returns (uint256) {
        uint256 tokenId = tokenCounter;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        tokenCounter += 1;
        return tokenId;
    }

    function updateTokenURI(uint256 tokenId, string memory newURI) external {
        require(ownerOf(tokenId) == msg.sender, "Not the owner of this token");
        _setTokenURI(tokenId, newURI);
    }
}
