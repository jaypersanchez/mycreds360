const { ethers } = require("hardhat");

async function main() {
  // Replace this with your transaction hash
  const txHash = "0x6012ac78ce497f6582c2aa925ecf1ab3bb364848b0e5f5ccd7cce720f79ef825";

  // Get the provider
  //const provider = ethers.getDefaultProvider();
  const provider = new ethers.providers.JsonRpcProvider("https://rpc.testnet.fantom.network/");

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
