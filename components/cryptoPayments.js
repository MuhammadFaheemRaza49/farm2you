"use client";

import { useState } from "react";

export default function CryptoPayment({ amount, onPaymentSuccess }) {
  const [transactionStatus, setTransactionStatus] = useState(null);

  const handlePayment = async () => {
    try {
      // Simulate blockchain payment
      // You can replace this with an actual Web3 or third-party crypto payment SDK
      setTransactionStatus("Processing...");
      await new Promise((resolve) => setTimeout(resolve, 2000)); // fake delay
      setTransactionStatus("Payment Successful!");
      if (onPaymentSuccess) onPaymentSuccess();
    } catch (error) {
      setTransactionStatus("Payment Failed!");
      console.error(error);
    }
  };

  return (
    <div className="bg-[#0a0a0a] p-6 rounded-2xl shadow-lg border border-green-700 text-white max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-green-400">Pay with Crypto</h2>
      <p className="mb-4">Amount: PKR {amount.toLocaleString()}</p>
      <button
        onClick={handlePayment}
        className="bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded-lg w-full"
      >
        Pay Now
      </button>
      {transactionStatus && (
        <p className="mt-4 text-center font-semibold">{transactionStatus}</p>
      )}
    </div>
  );
}
