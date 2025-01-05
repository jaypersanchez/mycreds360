// scripts/getTokenData.js
require('dotenv').config();
const { ethers } = require('ethers');
const mycredsABI = require('../artifacts/contracts/MyCredsNFT.sol/MyCredsNFT.json').abi;

async function main() {
    // Replace these values with your actual details
    const providerUrl = process.env.PROVIDER_URL; // e.g., http://localhost:8545
    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Your contract address
    
    const tokenId = 71187874924716071802023006159963233132327043875500075128411111270783033582670; // Replace with your token ID

    // Initialize provider
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, mycredsABI, provider);

    try {
        // Call the contract function
        // Convert tokenId to BigNumber
        const bigTokenId = ethers.BigNumber.from(tokenId);
        const jsonData = await contract.getTokenJsonData(bigTokenId);
        console.log(`Token JSON Data for token ID ${bigTokenId}:`, jsonData);
    } catch (error) {
        console.error('Error fetching token JSON data:', error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
