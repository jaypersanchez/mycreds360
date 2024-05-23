/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const { INFURA_PROJECT_ID, DEPLOYER_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      chainId: 1337 // Local network chain ID
    },
    amoy: {
      url: "https://polygon-amoy.g.alchemy.com/v2/zNwC9QKnfrFM0NraJfhrBg8MuuJ3hABG", //`https://polygon-amoy.g.alchemy.com/v2/${INFURA_PROJECT_ID}`,
      accounts: [DEPLOYER_PRIVATE_KEY] // Do not commit this!
    },
    polygon: {
      url: "https://polygon-amoy.g.alchemy.com/v2/zNwC9QKnfrFM0NraJfhrBg8MuuJ3hABG", //`https://polygon-amoy.g.alchemy.com/v2/${INFURA_PROJECT_ID}`,
      accounts: [DEPLOYER_PRIVATE_KEY] // Do not commit this!
    }
  }
};

