"use client";

import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";

export default function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.href },
    });

    setMessage(result.error?.message || "Payment Successful!");
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md bg-black rounded-2xl p-8 shadow-xl border border-green-400 flex flex-col items-center">
      {/* <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">Complete Your Payment</h2> */}

      <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
        <div className="p-4 bg-gray-900 rounded-lg border border-green-400">
          <PaymentElement />
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className="bg-green-400 text-black font-semibold px-6 py-3 rounded-lg w-full text-lg hover:bg-green-500 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          {loading ? "Processing..." : `Pay PKR ${amount}`}
        </button>

        {message && (
          <p className="text-gray-300 mt-3 text-center text-sm bg-gray-900 p-2 rounded-lg border border-green-400">
            {message}
          </p>
        )}
      </form>

      {/* Back button at the bottom */}

    </div>
    
  );
}
