const { ethers } = require("hardhat");

async function main() {
  // Replace this with your transaction hash
  const txHash = "0x23531e3174e73f77482709593effec315fe4c9e61ca35989695cb382e038051d";

  // Get the provider
  const provider = ethers.getDefaultProvider();

  // Fetch the transaction receipt
  const txReceipt = await provider.getTransactionReceipt(txHash);

  if (!txReceipt) {
    console.log("Transaction not found!");
    return;
  }

  // Fetch the transaction details
  const tx = await provider.getTransaction(txHash);

  console.log("Transaction Details:");
  console.log("Hash:", tx.hash);
  console.log("From:", tx.from);
  console.log("To:", tx.to);
  console.log("Value:", ethers.utils.formatEther(tx.value));
  console.log("Gas Used:", txReceipt.gasUsed.toString());
  console.log("Status:", txReceipt.status === 1 ? "Success" : "Fail");

  console.log("Transaction Receipt:");
  console.log(txReceipt);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
