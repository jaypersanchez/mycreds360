async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const MyCredsNFT = await ethers.getContractFactory("MyCredsNFT");
    const myCredsNFT = await MyCredsNFT.deploy();

    console.log("MyCredsNFT deployed to:", myCredsNFT.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
