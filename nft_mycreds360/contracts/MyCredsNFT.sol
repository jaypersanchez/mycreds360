// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyCredsNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;

    // Mapping to store JSON metadata and transaction hashes
    mapping(uint256 => string) public tokenJsonData;  // Token ID => JSON metadata
    mapping(uint256 => string) public tokenTransactionHash; // Token ID => Transaction hash

    event NFTMinted(uint256 indexed tokenId, string tokenURI, string jsonData, string transactionHash);

    constructor() ERC721("MyCredsNFT", "MNFT") Ownable() {
        // Initialize the contract and set the initial owner
    }

    function mint(string memory _tokenURI, string memory _jsonData, string memory _transactionHash) public onlyOwner {
        _safeMint(msg.sender, nextTokenId);
        _setTokenURI(nextTokenId, _tokenURI);

        // Store JSON metadata and transaction hash
        tokenJsonData[nextTokenId] = _jsonData;
        tokenTransactionHash[nextTokenId] = _transactionHash;

        emit NFTMinted(nextTokenId, _tokenURI, _jsonData, _transactionHash);

        nextTokenId++;
    }

    function getTokenJsonData(uint256 _tokenId) public view returns (string memory) {
        return tokenJsonData[_tokenId];
    }

    function getTokenTransactionHash(uint256 _tokenId) public view returns (string memory) {
        return tokenTransactionHash[_tokenId];
    }
}
