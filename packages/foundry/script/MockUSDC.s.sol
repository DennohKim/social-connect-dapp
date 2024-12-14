// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import {MockUSDC} from "../src/MockUSDC.sol";

contract DeployMockUSDC is Script {
    function run() public returns (MockUSDC) {
        vm.startBroadcast();
        
        MockUSDC mockUSDC = new MockUSDC();
        
        vm.stopBroadcast();
        return mockUSDC;
    }
} 