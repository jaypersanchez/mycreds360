// getNFTMetadata.js

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Fetching metadata with account:", deployer.address);

    // Replace with your deployed contract address
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const tokenId = "14632502148197600317655542594264536256024775577665517933672000963254001652417"; // Replace with your token ID

    // Get the contract instance
    const MyCredsNFT = await ethers.getContractFactory("MyCredsNFT");
    const myCredsNFT = await MyCredsNFT.attach(contractAddress);

    // Call the getTokenJsonData function
    const tokenJsonData = await myCredsNFT.getTokenJsonData(tokenId);
    console.log("Token JSON Data:", tokenJsonData);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
