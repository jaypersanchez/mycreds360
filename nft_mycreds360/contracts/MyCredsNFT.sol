// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyCredsNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    
    constructor() ERC721("MyCredsNFT", "MNFT") Ownable(msg.sender) {
        // Initialize the contract and set the initial owner
    }

    function mint(string memory _tokenURI) public onlyOwner {
        _safeMint(msg.sender, nextTokenId);
        _setTokenURI(nextTokenId, _tokenURI);
        nextTokenId++;
    }
}
