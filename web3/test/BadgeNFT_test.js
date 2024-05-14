// Import ethers from hardhat using ESM syntax if possible
import hardhat from 'hardhat';
const ethers = hardhat.ethers;

// Dynamically import chai
let expect;
import("chai")
  .then(chaiModule => {
    expect = chaiModule.expect;

    // Define tests after chai is fully imported
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
                expect(await w3CBBadgeNFT.name()).to.equal("W3CB");
                expect(await w3CBBadgeNFT.symbol()).to.equal("W3CBB");
            });
        });
    });

    describe("Minting", function () {
        it("Should mint a new token", async function () {
            await w3CBBadgeNFT.mint(addr1.address, "https://token.com/1");
            expect(await w3CBBadgeNFT.balanceOf(addr1.address)).to.equal(1);
            expect(await w3CBBadgeNFT.ownerOf(1)).to.equal(addr1.address);
            expect(await w3CBBadgeNFT.tokenURI(1)).to.equal("https://token.com/1");
        });
    });

    describe("Transactions", function () {
        beforeEach(async function () {
            await w3CBBadgeNFT.mint(addr1.address, "https://token.com/1");
        });

        it("Should transfer tokens between accounts", async function () {
            await w3CBBadgeNFT.connect(addr1).transferFrom(addr1.address, addr2.address, 1);
            expect(await w3CBBadgeNFT.balanceOf(addr1.address)).to.equal(0);
            expect(await w3CBBadgeNFT.balanceOf(addr2.address)).to.equal(1);
            expect(await w3CBBadgeNFT.ownerOf(1)).to.equal(addr2.address);
        });

        it("Should fail if sender doesn’t have permission to transfer", async function () {
            await expect(w3CBBadgeNFT.connect(addr2).transferFrom(addr1.address, addr2.address, 1))
                .to.be.revertedWith("ERC721: transfer caller is not owner nor approved");
        });
    });

  })
  .catch(error => console.error("Failed to load chai:", error));