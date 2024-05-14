/*
* Deploy to Mumbai testnet or Mainnet
npx hardhat run scripts/deploy.js --network mumbai
*/
async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
    
    const BadgeNFT = await ethers.getContractFactory("W3CBBadgeNFT");
    const badgeNFT = await BadgeNFT.deploy("W3CB", "W3CBB");
    
    console.log("BadgeNFT deployed to:", badgeNFT.address);
  }
  
  main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
  });


  