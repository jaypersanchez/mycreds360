async function main() {
/*
* AmoyA 
    wallet 0x1eeaa3A034725fd932EeD8165A20b5F43AE631a1
    pk e47b4da7de6bf4dd0e87e8fa8d3027a76307342adadd8e6cf341a061369acdae
* AmoyB 
    wallet 0x92dA26ed8bc777B1Ad0631AbF30E11CCDda89575
    pk 5fce8038e053c4cb303679fd352775db34882aefda87d9caafe63881cfd3cc52
*/
    const [deployer] = await ethers.getSigners();
    //console.log("Deploying contracts with the account:", deployer.address);

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
