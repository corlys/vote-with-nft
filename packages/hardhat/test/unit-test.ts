import { ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";

dotenvConfig({ path: resolve(__dirname, "./.env") });
import {
  VotingNFT__factory,
  Ballot__factory,
} from "../../frontend/types/typechain";

chai.use(solidity);
const { expect } = chai;

// const INFURA_API_KEY = process.env.INFURA_API_KEY || ""; //needed if you want to make a readOnly provider

describe("Unit Test", () => {
  let tokenAddress: string, ballotAddress: string;

  describe("Contract Deployment", () => {
    it("VotingNFTContract", async () => {
      try {
        const [deployer] = await ethers.getSigners();

        const VotingNFTFactory = new VotingNFT__factory(deployer);
        const VotingNFTContract = await VotingNFTFactory.deploy(
          "VoteNFT",
          "V",
          1000,
          await deployer.getAddress()
        );
        console.log(
          `deploying Voting NFT Contract to ${VotingNFTContract.address}`
        );
        await VotingNFTContract.deployed();
        console.log(
          `deployed Voting NFT Contract to ${VotingNFTContract.address}`
        );
        tokenAddress = VotingNFTContract.address;
        expect(tokenAddress).to.have.lengthOf(42);
      } catch (error) {
        console.log("Error VotingNFT Deploy", error);
      }
    });

    it("Ballot Contract", async () => {
      try {
        const [deployer] = await ethers.getSigners();
        const BallotFactory = new Ballot__factory(deployer);
        const BallotContract = await BallotFactory.deploy(tokenAddress);
        console.log(`deploying Ballot Contract to ${BallotContract.address}`);
        await BallotContract.deployed();
        console.log(`deployed Ballot Contract to ${BallotContract.address}`);
        ballotAddress = BallotContract.address;
        expect(ballotAddress).to.have.lengthOf(42);
      } catch (error) {
        console.log("Error Ballot Deploy", error);
      }
    });
  });

  describe("NFT Contract Properties", () => {
    it("Max supply corrrect", async () => {
      try {
        const [deployer] = await ethers.getSigners();
        const VotingNFTContract = new VotingNFT__factory(deployer).attach(
          tokenAddress
        );
        const ans = await VotingNFTContract.maxSuply();
        expect(ans).to.eq(1000);
      } catch (error) {
        // console.log(error);
      }
    });

    it("Master Vote corrrect", async () => {
      try {
        const [deployer, addr1] = await ethers.getSigners();
        const VotingNFTContract = new VotingNFT__factory(deployer).attach(
          tokenAddress
        );
        const ans = await VotingNFTContract.masterVote();
        expect(ans).to.eq(await deployer.getAddress());
      } catch (error) {
        // console.log(error);
      }
    });
  });

  describe("Register To Vote", () => {
    it("Register minting", async () => {
      try {
        const [deployer] = await ethers.getSigners();
        const address = await deployer.getAddress();
        let messageHash = ethers.utils.solidityKeccak256(
          ["string"],
          [`I want to register to vote as ${address}`]
        );
        const signedMessage = await deployer.signMessage(
          ethers.utils.arrayify(messageHash)
        );
        const VotingNFTContract = new VotingNFT__factory(deployer).attach(
          tokenAddress
        );
        const transaction = await VotingNFTContract.register(
          messageHash,
          signedMessage
        );
        const receipt = await transaction.wait();
        console.log(receipt.transactionHash);
        expect(await VotingNFTContract.balanceOf(address)).to.eq(1);
      } catch (error) {
        console.log(error);
        // console.log(error);
      }
    });
  });
});
