const hre = require("hardhat");

async function main() {
  const Chai = await hre.ethers.getContractFactory("chai");
  const chai = await Chai.deploy();

  await chai.deployed();

  console.log(`deployed to ${chai.address}`);
}

main();
