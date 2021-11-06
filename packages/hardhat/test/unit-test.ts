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
          await deployer.getAddress(),
          { gasLimit: 8000000 }
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
        const BallotContract = await BallotFactory.deploy(tokenAddress, {
          gasLimit: 8000000,
        });
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
        console.log("Error Max supply corrrect", error);
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
        console.log("Error Master Vote corrrect", error);
        // console.log(error);
      }
    });
  });

  describe("Voting Process", () => {
    it("Register minting", async () => {
      try {
        const [deployer, addr1] = await ethers.getSigners();
        const address = await addr1.getAddress();
        let messageHash = ethers.utils.solidityKeccak256(
          ["string"],
          [`I want to register to vote as ${address}`]
        );
        const signedMessage = await deployer.signMessage(
          ethers.utils.arrayify(messageHash)
        ); //the current masterVote, is the deployer
        const VotingNFTContract = new VotingNFT__factory(addr1).attach(
          tokenAddress
        );
        const transaction = await VotingNFTContract.register(
          messageHash,
          signedMessage
        );
        const receipt = await transaction.wait();
        expect(await VotingNFTContract.balanceOf(address)).to.eq(1);
      } catch (error) {
        console.log("Error Register minting", error);
        // console.log(error);
      }
    });

    it("Open the Vote", async () => {
      try {
        const [deployer] = await ethers.getSigners();
        const BallotContract = new Ballot__factory(deployer).attach(
          ballotAddress
        );

        const transaction = await BallotContract.open();
        const receipt = await transaction.wait();

        expect(await BallotContract.votingTime()).to.eq(true);
      } catch (error) {
        console.log("Error Open the vote", error);
      }
    });

    it("Try to vote on Candidate 1", async () => {
      try {
        const [_, addr1] = await ethers.getSigners();
        const BallotContract = new Ballot__factory(addr1).attach(ballotAddress);
        const transaction = await BallotContract.vote(0, {
          gasLimit: 8000000,
        });
        const receipt = await transaction.wait();
        const result = await BallotContract.result();
        expect(result[0].toNumber()).to.eq(1);
      } catch (error) {
        console.log("Error Try to vote on Candidate 1", error);
      }
    });

    it("Close the vote", async () => {
      try {
        const [deployer] = await ethers.getSigners();
        const BallotContract = new Ballot__factory(deployer).attach(
          ballotAddress
        );
        const transaction = await BallotContract.finalize();
        const receipt = await transaction.wait();
        expect(await BallotContract.votingTime()).to.eq(false);
      } catch (error) {
        console.log("Error Close the vote", error);
      }
    });
  });
});
