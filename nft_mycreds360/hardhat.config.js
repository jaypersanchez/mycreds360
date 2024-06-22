require("@nomiclabs/hardhat-waffle");

module.exports = {
    solidity: "0.8.20",
    networks: {
        hardhat: {},
        amoy: {
            url: "https://polygon-amoy.g.alchemy.com/v2/zNwC9QKnfrFM0NraJfhrBg8MuuJ3hABG",
            accounts: ['e47b4da7de6bf4dd0e87e8fa8d3027a76307342adadd8e6cf341a061369acdae'], // Replace with your wallet's private key
            gasPrice: 1000000000, // 1 Gwei
            gas: 500000 // Example gas limit
          }
    }
};

/*
* Amoy contract address 0x8edDdb4DB4090c6E0e558A8b22fD290C3E1700b2
*/

