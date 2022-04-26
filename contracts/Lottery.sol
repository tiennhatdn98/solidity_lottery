//SPDX-License-Identifier: MIT 

pragma solidity ^0.8.0;

contract Lottery{
    address public manager;
    address[] public players;
    mapping (address => uint) balances;
    address payable public winner;

    function lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        // fee enter more than 0.01 ethers
        require(msg.value > .01 ether, "Fee must be more than 0.01 ether");
        players.push(msg.sender);
    }

    function random() private view returns(uint) {
        return  uint (keccak256(abi.encode(block.timestamp,  players)));
    }

    function getRandom() public view returns(uint) {
        uint index = random() % players.length;
        return index;
    }

    function pickWinner() public restricted {
        //only the manager can pickWinner
        require(msg.sender == manager);
        uint index = random() % players.length;
        // transfer balance of contract to winner
        payable (players[index]).transfer(address(this).balance);
        winner = payable(players[index]);
        players = new address[](0);
    }

    function getBalanceOf() public view returns (uint256) {
        return address(msg.sender).balance;
    }

    function totolReward() public view returns (uint256) {
        return address(this).balance;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}