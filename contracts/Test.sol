// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.8.7;

import './interfaces/ILendingPool.sol';

contract Test{

    constructor() public {
       
    }

    function borrow(address asset, uint256 amount, uint256 interestRateMode, uint16 referralCode, address onBehalfOf) payable external{
        ILendingPool(0x58ad305f1eCe49ca55ADE0D5cCC90114C3902E88).borrow(asset, amount, interestRateMode, referralCode, onBehalfOf);
    }

    function repay(address asset, uint256 amount, uint256 interestRateMode, address onBehalfOf) external{
        ILendingPool(0x58ad305f1eCe49ca55ADE0D5cCC90114C3902E88).repay(asset, amount, interestRateMode, onBehalfOf);
    }
}