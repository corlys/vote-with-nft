import { Contract } from "ethers";
import { config, ethers } from "hardhat";
import fs from "fs";
import BallotArtifact from "../../frontend/artifacts/contracts/Ballot.sol/Ballot.json";
import { Ballot__factory } from "../../frontend/types/typechain";
// import BallotArtifact from "@/artifacts/contracts/Ballot.sol/Ballot.json";

async function main() {
  const [deployer] = await ethers.getSigners();

  // We get the contract to deploy
  const BallotContractFactory = new Ballot__factory(deployer);
  const contract = await BallotContractFactory.deploy(
    "0x8c119a35187c34891b2dc5b724f26d676c8cd696"
  );

  await contract.deployed();
  console.log("BallotContract deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
