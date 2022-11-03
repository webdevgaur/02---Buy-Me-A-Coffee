const hre = require("hardhat");

async function getBalances(address) {
    const balanceBigInt = await hre.ethers.provider.getBalance(address);
    // console.log('Balance is:', balanceBigInt);
    return hre.ethers.utils.formatEther(balanceBigInt);
}

async function printBalances(addresses) {
    let i = 0;
    for (let address of addresses) {
        console.log(`Balance of address ${i}:`, await getBalances(address));
        i++;
    }
}

async function printMemos(memos) {
    for (let memo of memos) {
        const timestamp = memo.timestamp;
        const tipperAddress = memo.from;
        const tipperName = memo.name;
        const message = memo.message;
        console.log(`${tipperName} with wallet address ${tipperAddress} said, "${message}" at ${timestamp}.`);
    }
}

async function main() {
    const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();
    const buyMeACoffeeFactory = await hre.ethers.getContractFactory("BuyMeACoffee");
    const buyMeACoffeeContract = await buyMeACoffeeFactory.deploy();
    await buyMeACoffeeContract.deployed();
    console.log('Contract deployed to address:', buyMeACoffeeContract.address);

    const addresses = [owner.address, tipper.address, buyMeACoffeeContract.address];
    console.log('=====Starting here=====');
    await printBalances(addresses);

    const tip = {value: hre.ethers.utils.parseEther('1')};
    await buyMeACoffeeContract.connect(tipper).buyCoffee('Sanskriti', 'Message from Sanskriti', tip);
    await buyMeACoffeeContract.connect(tipper2).buyCoffee('Biswarup', 'Message from Biswarup', tip);
    await buyMeACoffeeContract.connect(tipper3).buyCoffee('Aravind', 'Message from Aravind', tip);

    console.log('=====Bought coffees=====');
    await printBalances(addresses);

    await buyMeACoffeeContract.withdrawTips();
    console.log('=====Tips withdrawn=====');
    await printBalances(addresses);

    const memos = await buyMeACoffeeContract.getMemos();
    console.log('=====Memos fetched=====');
    printMemos(memos);

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