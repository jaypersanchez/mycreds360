require("@nomiclabs/hardhat-waffle");

module.exports = {
    solidity: "0.8.20",
    networks: {
        hardhat: {
            // Configuration specific to the Hardhat network
            chainId: 1337 // Common chain ID for local Hardhat network
        },
        amoy: {
            url: "https://polygon-amoy.g.alchemy.com/v2/zNwC9QKnfrFM0NraJfhrBg8MuuJ3hABG",
            // Replace with your wallet's private key
            accounts: ['e47b4da7de6bf4dd0e87e8fa8d3027a76307342adadd8e6cf341a061369acdae'], 
            gasPrice: 1000000000, // 1 Gwei
            gas: 500000 // Example gas limit
        }
    }
};

/*
* Amoy contract address 0x8edDdb4DB4090c6E0e558A8b22fD290C3E1700b2
* Hardhat contract address 0x5FbDB2315678afecb367f032d93F642f64180aa3
npx hardhat run scripts/deploy.js --network hardhat

* npx hardhat run scripts/getAccounts.js --network hardhat
* npx hardhat run scripts/getAccounts.js --network amoy
*
*
Address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has balance: 10000.0 ETH
Address: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has balance: 10000.0 ETH
Address: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has balance: 10000.0 ETH
Address: 0x90F79bf6EB2c4f870365E785982E1f101E93b906 has balance: 10000.0 ETH
Address: 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has balance: 10000.0 ETH
Address: 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc has balance: 10000.0 ETH
Address: 0x976EA74026E726554dB657fA54763abd0C3a0aa9 has balance: 10000.0 ETH
Address: 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955 has balance: 10000.0 ETH
*
*/

