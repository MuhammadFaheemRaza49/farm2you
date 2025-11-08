"use client";

import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function UserPayment() {
  const walletAddress = "0xd3bef23bb4f20ee60e761a4d63b29fa82628009f"; // Replace with your wallet
  const [cartItems, setCartItems] = useState([]);
  const [totalPKR, setTotalPKR] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("userCart");
    if (storedCart) {
      const items = JSON.parse(storedCart);
      setCartItems(items);

      // Calculate total PKR
      const total = items.reduce((sum, item) => sum + parseInt(item.price.replace(/\D/g, "")), 0);
      setTotalPKR(total);
    }
  }, []);

  // Convert PKR to ETH
  const ethAmount = (totalPKR / 50000).toFixed(6); // Example: 1 ETH = 50,000 PKR
  const ethAmountWei = (parseFloat(ethAmount) * 1e18).toString(); // Convert ETH to wei
  const qrValue = `ethereum:${walletAddress}?value=${ethAmountWei}&chainId=5`;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-green-400 mb-8">Blockchain Payment</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <>
          <div className="mb-6">
            <QRCodeCanvas
              value={qrValue}
              size={200}
            />
          </div>
          <p className="text-gray-300 text-center">
            Scan this QR code with MetaMask or any Ethereum wallet to pay{" "}
            <span className="text-green-400 font-semibold">{ethAmount} ETH</span>.
          </p>
          <p className="text-gray-500 mt-2 text-sm">
            Wallet Address: <span className="text-gray-300">{walletAddress}</span>
          </p>
        </>
      )}
    </div>
  );
}
