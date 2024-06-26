// scripts/getAccounts.js
async function main() {
    const accounts = await ethers.getSigners();

    for (const account of accounts) {
        const balance = await ethers.provider.getBalance(account.address);
        console.log(`Address: ${account.address} has balance: ${ethers.utils.formatEther(balance)} ETH`);
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
