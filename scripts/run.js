const hre = require("hardhat");

async function getBalances(address) {
    const balanceBigInt = await hre.provider.getBalance(address);
    console.log('Balance is:', balanceBigInt);
    return hre.ethers.utils.formatEther(balanceBigInt);
}

async function printBalances(addresses) {
    // let i = 0;
    // for (let address of addresses) {
    //     console.log(`Balance of address ${i}:`, await getBalances(address));
    //     i++;
    // }

    addresses.forEach( async (address, index) => {
        console.log(`Balance of address ${index}:`, await getBalances(address));
    });
}

async function main() {
    const buyMeACoffeeFactory = await hre.ethers.getContractFactory("BuyMeACoffee");
    const buyMeACoffeeContract = await buyMeACoffeeFactory.deploy();
    await buyMeACoffeeContract.deployed();
    console.log('Contract deployed to address:', buyMeACoffeeContract.address);
}

async function runMain() {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();