// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract BuyMeACoffee {

    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    Memo[] memos;

    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * @dev Buy a coffee for the contract owner
     * @param _name name of the coffee buyer
     * @param _message message sent by the coffee buyer
     */
    function buyCoffee(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "Can't buy coffee with 0 eth bro");

        memos.push(Memo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));

        emit NewMemo (
            msg.sender,
            block.timestamp,
            _name,
            _message
        );

        console.log('This is the timestamp-', block.timestamp);
    }

    /**
     * @dev Send the balanced stored in the contract to the owner
     */
    function withdrawTips() public {        
        require(owner.send(address(this).balance));
    }

    /**
     * @dev Retrieve memos stored onchain for the frontend client to display
     */
    function getMemos() public view returns(Memo[] memory) {
        return memos;
    }


}
