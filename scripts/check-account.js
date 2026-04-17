import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const address = await deployer.getAddress();
  const balance = await hre.ethers.provider.getBalance(address);

  console.log("Account Address:", address);
  console.log("Balance:", hre.ethers.formatEther(balance), "INIT");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
