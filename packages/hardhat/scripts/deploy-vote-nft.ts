import { Contract } from "ethers";
import { config, ethers } from "hardhat";
import fs from "fs";
// import VotingNFTArtifact from "../../frontend/artifacts/contracts/VotingNFT.sol/VotingNFT.json";
import { VotingNFT__factory } from "../../frontend/types/typechain";
// import VotingNFTArtifact from "@/artifacts/contracts/VotingNFT.sol/VotingNFT.json";

async function main() {
  const [deployer] = await ethers.getSigners();

  // const VotingNFTContract = await ethers.getContractFactory("VotingNFT");

  // const contract = await VotingNFTContract.deploy(
  //   "VoteNFT",
  //   "V",
  //   1000,
  //   await deployer.getAddress()
  // );

  const VotingNFTContract = new VotingNFT__factory(deployer);

  const contract = await VotingNFTContract.deploy(
    "VoteNFT",
    "V",
    1000,
    await deployer.getAddress(),
    { gasLimit: 8000000 }
  );

  await contract.deployed();

  const supply = await contract.maxSuply();
  console.log(supply);
  console.log("VotingNFTContract deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
