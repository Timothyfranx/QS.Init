const hre = require("hardhat");

async function main() {
  console.log("Deploying QuickSplit.INIT contracts to MiniEVM Testnet...");

  // 1. Deploy QuickSplitKarma (NFT/Gaming Layer)
  const QuickSplitKarma = await hre.ethers.getContractFactory("QuickSplitKarma");
  const karma = await QuickSplitKarma.deploy();
  await karma.waitForDeployment();
  console.log(`QuickSplitKarma deployed to: ${await karma.getAddress()}`);

  // 2. Deploy QuickSplit (DeFi/Settlement Layer)
  const QuickSplit = await hre.ethers.getContractFactory("QuickSplit");
  const quickSplit = await QuickSplit.deploy();
  await quickSplit.waitForDeployment();
  console.log(`QuickSplit deployed to: ${await quickSplit.getAddress()}`);

  console.log("Deployment complete!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
