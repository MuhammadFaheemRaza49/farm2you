"use client";
import { useState } from "react";

export default function FarmerAdsPage() {
  // Sample ads data
  const [ads, setAds] = useState([
    { id: 1, productName: "Wheat", quantity: 2, price: 10000, status: "Pending" },
    { id: 2, productName: "Rice", quantity: 3, price: 15000, status: "Approved" },
    { id: 3, productName: "Vegetables", quantity: 1, price: 5000, status: "Completed" },
  ]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-green-400">Your Ads</h1>

      <div className="overflow-x-auto w-full max-w-4xl">
        <table className="min-w-full bg-[#0a0a0a] border border-green-700 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-green-700 text-black">
              <th className="py-3 px-6 text-left">Product Name</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad.id} className="border-t border-green-700">
                <td className="py-3 px-6">{ad.productName}</td>
                <td className="py-3 px-6">{ad.quantity} x 40kg</td>
                <td className="py-3 px-6">{ad.price}</td>
                <td
                  className={`py-3 px-6 font-semibold ${
                    ad.status === "Pending"
                      ? "text-yellow-400"
                      : ad.status === "Approved"
                      ? "text-green-400"
                      : "text-gray-400"
                  }`}
                >
                  {ad.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
