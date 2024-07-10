async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const MyCredsNFT = await ethers.getContractFactory("MyCredsNFT");
    const myCredsNFT = await MyCredsNFT.deploy();

    await myCredsNFT.deployed();

    console.log("MyCredsNFT deployed to:", myCredsNFT.address);

    // Export the contract address for server-side interaction
    return myCredsNFT.address;
}

main().then((contractAddress) => {
    console.log('Contract address:', contractAddress);
    process.exit(0); // Exit the script after deployment
}).catch((error) => {
    console.error(error);
    process.exit(1);
});
