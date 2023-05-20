// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  async function getBalance(address) {
    const balanceBigInt = await hre.ethers.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt);
  }

  async function ConsoleMemos(momos) {
    for (const memo of momos) {
      const timeStamp = memo.timeStamp;
      const name = memo.name;
      const from = memo.from;
      const message = memo.message;
      console.log(`At ${timeStamp}, name ${name}, address ${await from}, message ${message}`);
    }
  }

  const [owner, addr1, addr2, addr3] = await hre.ethers.getSigners();

  console.log(`balance of Owner is ${await getBalance(owner.address)}`);
  console.log(`balance of Address 1 is ${await getBalance(addr1.address)}`);
  console.log(`balance of Address 2 is ${await getBalance(addr2.address)}`);
  console.log(`balance of Address 3 is ${await getBalance(addr3.address)}`);

  const Chai = await hre.ethers.getContractFactory("chai");
  const chai = await Chai.deploy();

  await chai.deployed();

  console.log(`deployed to ${chai.address}`);

  const amount = { value: hre.ethers.utils.parseEther("1") };
  await chai.connect(addr1).buyChai("from addr 1", "very Nice Chai", amount);
  await chai.connect(addr2).buyChai("from addr 2", "excellent Chai", amount);
  await chai.connect(addr3).buyChai("from addr 3", "good job ", amount);

  console.log("after buying chai balance is => ");

  console.log(`balance of Owner is ${await getBalance(owner.address)}`);
  console.log(`balance of Address 1 is ${await getBalance(addr1.address)}`);
  console.log(`balance of Address 2 is ${await getBalance(addr2.address)}`);
  console.log(`balance of Address 3 is ${await getBalance(addr3.address)}`);

  console.log("get Memos");
  const Memos = await chai.getMemos();
  console.log("%%%%%%%%%%%%%%% Memos are ", Memos);
  ConsoleMemos(Memos);
}

main();
