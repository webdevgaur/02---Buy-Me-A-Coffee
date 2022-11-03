
const hre = require("hardhat");

async function main() {
  const buyMeACoffeeFactory = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffeeContract = await buyMeACoffeeFactory.deploy();
  await buyMeACoffeeContract.deployed();
  console.log('Contract deployed to address:', buyMeACoffeeContract.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
