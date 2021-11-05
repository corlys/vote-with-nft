//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ballot is Ownable {

  IERC721 votingToken;

  struct VotingStruct {
    uint256 candidateA;
    uint256 candidateB;
  }

  mapping(address => bool) hasVoted;
  mapping(address => uint256) candidate;

  bool votingTime; 

  VotingStruct result;

  constructor(IERC721 votingTokenAddress) {
    votingToken = IERC721(votingTokenAddress);
    // require(votingToken.balanceOf(msg.sender) == 1, "Voter NFT does not exitst");
  } 

  function vote(uint256 _chosen) votingAllowed external {
    require(votingToken.balanceOf(msg.sender) == 1, "Voter NFT does not exitst");
    require(!hasVoted[msg.sender], "Already voted");
    if(_chosen == 0) {
      result.candidateA++;
    } else {
      result.candidateB++;
    }
  }

  modifier votingAllowed () {
    require(votingTime, "Ballot is closed");
    _;
  }

  function finalize() external onlyOwner votingAllowed {
    votingTime = false;
  }

  function open() external onlyOwner {
    votingTime = true;
  }

}