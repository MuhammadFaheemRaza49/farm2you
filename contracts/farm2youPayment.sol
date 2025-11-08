// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Farm2YouPayment {
    address public owner;

    constructor() {
        owner = msg.sender; // deployer is the owner
    }

    struct Order {
        address buyer;
        string product;
        uint256 amount; // store in smallest unit (wei)
        bool paid;
    }

    Order[] public orders;

    // Add an order
    function addOrder(address buyer, string memory product, uint256 amount) public {
        orders.push(Order(buyer, product, amount, false));
    }

    // Pay for an order (by order index)
    function pay(uint256 orderId) public payable {
        require(orderId < orders.length, "Invalid order ID");
        Order storage order = orders[orderId];
        require(msg.sender == order.buyer, "Not your order");
        require(!order.paid, "Already paid");
        require(msg.value >= order.amount, "Insufficient ETH sent");

        order.paid = true;

        // Optionally refund extra ETH sent
        if (msg.value > order.amount) {
            payable(msg.sender).transfer(msg.value - order.amount);
        }
    }

    // Owner can withdraw all ETH
    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    // View all orders
    function getOrders() public view returns (Order[] memory) {
        return orders;
    }
}
