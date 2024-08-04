// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyCredsNFT is ERC721URIStorage {
    uint256 public nextTokenId;

    // Mapping to store JSON metadata
    mapping(uint256 => string) public tokenJsonData;  // Token ID => JSON metadata

    event NFTMinted(uint256 indexed tokenId, string tokenURI, string jsonData);

    constructor() ERC721("MyCredsNFT", "MNFT") {
        // Initialize the contract
    }


    function mint(uint256 _tokenId, string memory _tokenURI, string memory _jsonData) public {
        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);

        // Store JSON metadata
        tokenJsonData[_tokenId] = _jsonData;

        emit NFTMinted(_tokenId, _tokenURI, _jsonData);
        getTokenJsonData(_tokenId);
    }

    function getTokenJsonData(uint256 _tokenId) public view returns (string memory) {
        return tokenJsonData[_tokenId];
    }
}
