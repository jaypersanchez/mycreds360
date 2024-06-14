// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NftCertificate is ERC721, Ownable {
    uint256 public tokenCounter;

    constructor () ERC721("NftCertificate", "NFTC") {
        tokenCounter = 0;
    }

    function createCertificate(string memory tokenURI) public onlyOwner returns (uint256) {
        _safeMint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, tokenURI);
        tokenCounter++;
        return tokenCounter;
    }
}