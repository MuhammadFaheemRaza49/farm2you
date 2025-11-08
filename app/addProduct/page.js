"use client";
import { useState } from "react";

export default function AddOrderPage() {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([null, null, null]); // For 3 separate images

  const handleImageChange = (index, e) => {
    const file = e.target.files[0] || null;
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("quantity", quantity);
    formData.append("description", description);
    images.forEach((image, index) => {
      if (image) formData.append(`image${index + 1}`, image);
    });

    // TODO: send formData to backend API
    console.log("Submitting order:", { productName, quantity, description, images });
    alert("Order submitted successfully!");

    // Reset form
    setProductName("");
    setQuantity("");
    setDescription("");
    setImages([null, null, null]);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-green-400">Add New Order</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#0a0a0a] p-8 rounded-2xl shadow-[0_0_20px_rgba(22,163,74,0.3)] w-full max-w-2xl"
      >
        {/* Product Name */}
        <label className="block mb-4">
          <span className="text-green-400 font-semibold">Product Name</span>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="mt-2 w-full p-3 rounded-lg bg-black border border-green-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </label>

        {/* Quantity */}
        <label className="block mb-4">
          <span className="text-green-400 font-semibold">Quantity</span>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="mt-2 w-full p-3 rounded-lg bg-black border border-green-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </label>

        {/* Description */}
        <label className="block mb-4">
          <span className="text-green-400 font-semibold">Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            className="mt-2 w-full p-3 rounded-lg bg-black border border-green-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </label>

        {/* Attach Images Separately in 2-column grid */}
        <div className="mb-6">
          <span className="text-green-400 font-semibold block mb-2">
            Attach Images (up to 3)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex flex-col items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(index, e)}
                  className="text-white"
                />
                {images[index] && (
                  <img
                    src={URL.createObjectURL(images[index])}
                    alt={`Preview ${index + 1}`}
                    className="mt-2 h-32 w-full object-cover rounded-lg border border-green-700"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-black font-medium px-6 py-3 rounded-lg shadow-md transition-all w-full"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}
