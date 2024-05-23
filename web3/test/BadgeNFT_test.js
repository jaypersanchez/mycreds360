// Import ethers from hardhat using ESM syntax if possible
import hardhat from 'hardhat';
//const ethers = hardhat.ethers;
const { ethers, assert } = hardhat;

// Define tests after Hardhat is fully imported
describe("W3CBBadgeNFT", function () {
    let W3CBBadgeNFT;
    let w3CBBadgeNFT;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        W3CBBadgeNFT = await ethers.getContractFactory("W3CBBadgeNFT");
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy a new contract before each test
        w3CBBadgeNFT = await W3CBBadgeNFT.deploy("W3CB", "W3CBB");
        await w3CBBadgeNFT.deployed();
    });

    describe("Deployment", function () {
        it("Should have the correct name and symbol", async function () {
            assert.equal(await w3CBBadgeNFT.name(), "W3CB");
            assert.equal(await w3CBBadgeNFT.symbol(), "W3CBB");
        });
    });

    describe("Minting", function () {
        it("Should mint a new token", async function () {
            await w3CBBadgeNFT.mint(addr1.address, "https://token.com/1");
            assert.equal(await w3CBBadgeNFT.balanceOf(addr1.address), 1);
            assert.equal(await w3CBBadgeNFT.ownerOf(1), addr1.address);
            assert.equal(await w3CBBadgeNFT.tokenURI(1), "https://token.com/1");
        });
    });

    describe("Transactions", function () {
        beforeEach(async function () {
            await w3CBBadgeNFT.mint(addr1.address, "https://token.com/1");
        });

        it("Should transfer tokens between accounts", async function () {
            await w3CBBadgeNFT.connect(addr1).transferFrom(addr1.address, addr2.address, 1);
            assert.equal(await w3CBBadgeNFT.balanceOf(addr1.address), 0);
            assert.equal(await w3CBBadgeNFT.balanceOf(addr2.address), 1);
            assert.equal(await w3CBBadgeNFT.ownerOf(1), addr2.address);
        });

        it("Should fail if sender doesn’t have permission to transfer", async function () {
            await assert.revertedWith(w3CBBadgeNFT.connect(addr2).transferFrom(addr1.address, addr2.address, 1),
                "ERC721: transfer caller is not owner nor approved");
        });
    });
});