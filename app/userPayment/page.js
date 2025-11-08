"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion"; // ✅ import motion
import CheckoutForm from "../userCheckOutForm"; // correct import path

const stripePromise = loadStripe(
  "pk_test_51SRFZMI4vg0diLMWkRZWEZRip9xqp5ax8UAc6YzB9C6fCUv7JnxEIkCg416J6Au4ZAoMfNzw577m6cQrJxgeOWtp00kq9mjTTK"
);

export default function UserPayment() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPKR, setTotalPKR] = useState(0);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const storedCart = localStorage.getItem("userCart");
    if (storedCart) {
      const items = JSON.parse(storedCart);
      setCartItems(items);

      const total = items.reduce(
        (sum, item) => sum + parseInt(item.price.replace(/\D/g, "")),
        0
      );
      setTotalPKR(total);

      fetch("http://localhost:3000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }) // PKR → cents if needed
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, []);

  const options = { clientSecret };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-green-400 mb-8">Stripe Payment</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm amount={totalPKR} />
        </Elements>
      ) : (
        <p className="text-gray-300">Loading payment form...</p>
      )}

      {/* Back button linking to userCart page */}
      <Link href="/userCart" className="">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-green-500 text-black font-semibold px-6 py-3  rounded-lg shadow-md hover:bg-green-600 hover:text-white transition mt-12 w-40 "
        >
          ← Back
        </motion.button>
      </Link>
    </div>
  );
}
