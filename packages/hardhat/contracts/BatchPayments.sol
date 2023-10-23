// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BatchPayments {
    // define variables

    address public companyAcc;
    uint public companyBal;
    uint public totalWorkers;
    uint public totalSalary;
    uint public totalPayments;

    mapping(address => bool) workerExists;

    EmployeeStruct[] employees;

    event Paid(uint id, address indexed to, uint totalSalary, uint timeStamp);

    struct EmployeeStruct {
        uint id;
        address worker;
        uint salary;
        uint timeStamp;
    }

    modifier ownerOnly() {
        require(msg.sender == companyAcc, "Only owner can call this function");
        _;
    }

    constructor() {
        companyAcc = msg.sender;
    }

    function addEmployee(address _worker, uint _salary) public ownerOnly returns (bool){
        require(!workerExists[_worker], "Worker already exists");
        require(_salary > 0, "Salary must be greater than 0");
        
		totalWorkers++;
		totalSalary += _salary;
        workerExists[_worker] = true;
        
		employees.push(
            EmployeeStruct(totalWorkers, _worker, _salary, block.timestamp)
        );

		return true;
    }

	function payEmployees() public ownerOnly returns (bool) {
		require(companyBal >= totalSalary, "Insufficient funds");

		for (uint i = 0; i < employees.length; i++) {
			payTo(employees[i].worker, employees[i].salary);
		}

		totalPayments ++;
		companyBal -= totalSalary;

		emit Paid(totalPayments, companyAcc, totalSalary, block.timestamp);

		return true;

	}

	function payTo(address to, uint amount) internal returns (bool) {
		(bool succeeded, ) = payable(to).call{value: amount}("");
		require(succeeded, "Payment failed");
		return true;
	}

	function fundCompanyAccount() public payable returns (bool) {
		require(companyAcc != msg.sender, "You acan't fund yourself");
		require(msg.value > 0 ether, "Insufficient Amount");

		companyBal += msg.value;
		return true;
	}

	function getEmployees() public view returns (EmployeeStruct[] memory) {
		return employees;
	}
}
