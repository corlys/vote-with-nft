//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ballot {

  IERC721 votingToken;

  struct CandidateStruct {
    uint256 candidateA;
    uint256 candidateB;
  }

  mapping(address => bool) hasVoted;

  CandidateStruct result;

  constructor(address votingTokenAddress) {
    votingToken = IERC721(votingTokenAddress);
  } 

  function vote(uint256 _chosen) external {
    require(votingToken.balanceOf(msg.sender) == 1, "Voter NFT does not exitst");
    require(!hasVoted[msg.sender], "Already voted");
    if(_chosen == 0) {
      result.candidateA++;
    } else {
      result.candidateB++;
    }
  }

}