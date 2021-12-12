// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.3;

//Import ownable from the OpenZeppelin Contracts library
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract BoxV2 is Initializable{
    uint256 private _value;

    function initialize() public initializer {
        _value = 0;
    }

    //Emitted when the stored value changes
    event ValueChanged(uint256 value);

    function store(uint256 value) public initializer {
        //stores a new value in the contract
            _value = value;
            emit ValueChanged(value);
    }
    
    //Reads the last stored value
    function retrieve() public view returns (uint256) {
        return _value;
    }

    //increments the stored value by 1
    function increment() public {
        _value = _value + 1;
        emit ValueChanged((_value));
    }
}