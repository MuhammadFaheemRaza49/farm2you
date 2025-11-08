"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { User, Scale, DollarSign, ShoppingCart } from "lucide-react";
import { useUserStore } from "../..//store/store";
import toast from "react-hot-toast";

export default function UserNewOrder() {
  const { cartItems, setCartItems } = useUserStore();

  const [products, setProducts] = useState([]);
  const getProducts = async () => {
     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/get-products`);
    const data = await res.json();
    console.log(data)
    setProducts(data.products);

  }

  useEffect(()=> {
    getProducts();
  }, [])
  const [ads] = useState([
    {
      id: 1,
      farmer: "Ali Khan",
      product: "Wheat",
      quantity: "500 kg",
      price: "PKR 40,000",
      description: "Fresh wheat from Punjab fields, ready for delivery.",
      images: ["/crops/wheat.png", "/homePage/wheat1.jpg", "/homePage/wheat2.jpg"],
    },
    {
      id: 2,
      farmer: "Ahmed Raza",
      product: "Rice",
      quantity: "300 kg",
      price: "PKR 35,000",
      description: "Premium quality basmati rice harvested this season.",
      images: ["/crops/rice.png", "/homePage/bg1.jpg", "/homePage/bg2.jpg"],
    },
    {
      id: 3,
      farmer: "Sara Malik",
      product: "Vegetables",
      quantity: "150 kg",
      price: "PKR 20,000",
      description: "Fresh organic vegetables grown without chemicals.",
      images: ["/crops/vegetables.png", "/homePage/bg1.jpg", "/homePage/wheat1.jpg"],
    },
    {
      id: 4,
      farmer: "Bilal Iqbal",
      product: "Corn",
      quantity: "400 kg",
      price: "PKR 28,000",
      description: "Golden corn, rich in taste and quality, available in bulk.",
      images: ["/crops/corn.png", "/homePage/bg2.jpg", "/homePage/wheat2.jpg"],
    },
  ]);

  const [currentIndexes, setCurrentIndexes] = useState(
    products.map(() => 0) // Track current image for each ad
  );


  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("userCart")) || [];
    setCartItems(storedCart);
  }, []);

  // Auto-slide images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndexes((prevIndexes) =>
        prevIndexes.map((index, i) => (index + 1) % ads[i].images.length)
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [ads]);

  // Add item to cart
  const addToCart = (ad) => {
    const existingCart = JSON.parse(localStorage.getItem("userCart")) || [];
    existingCart.push(ad);
    localStorage.setItem("userCart", JSON.stringify(existingCart));
    setCartItems(existingCart); 
    toast.success(`${ad.productName} added to cart`)
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-12 relative">
      

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-green-400 drop-shadow-[0_0_15px_rgba(22,163,74,0.6)] mb-4">
          Available Farmer Ads 🌾
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Browse fresh produce directly from verified farmers and place your order instantly.
        </p>
      </motion.div>

      {/* Farmer Ads Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
      >
        {products.map((ad, index) => (
          <motion.div
            key={ad.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#0a0a0a] border border-green-700 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:shadow-[0_0_25px_rgba(22,163,74,0.5)] transition-all"
          >
            {/* Image Slider */}
            <div className="w-full h-48 relative overflow-hidden">
              <motion.img
                key={currentIndexes[index]}
                src={ad.images[0]}
                alt={ad.product}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4 text-center">
                {ad.productName}
              </h2>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <User className="text-green-400 w-5 h-5" />
                  <span>{ad.user.username}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Scale className="text-green-400 w-5 h-5" />
                  <span>{ad.qty}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <DollarSign className="text-green-400 w-5 h-5" />
                  <span>{ad.price}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addToCart(ad)}
                className="w-full bg-green-500 hover:bg-green-600 text-black font-medium py-3 rounded-lg shadow-md transition-all"
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12"
      >
        <Link href="/userDashboard">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-green-500 text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-600 hover:text-white transition"
          >
            ← Back to Dashboard
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
