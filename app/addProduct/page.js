"use client";
import { useState, useEffect } from "react";

export default function AddOrderPage() {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(5000); // Base price per unit
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([null, null, null]); // For 3 separate images
  const unitPrice = 5000; // Price per 40 kg

  const [showMicModal, setShowMicModal] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

  // Update total price whenever quantity changes
  useEffect(() => {
    const total = quantity ? Number(quantity) * unitPrice : unitPrice;
    setPrice(total);
  }, [quantity]);

  const handleImageChange = (index, e) => {
    const file = e.target.files[0] || null;
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  // Start recording
  const startRecording = async () => {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      alert("Your browser does not support audio recording");
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: "audio/webm" });
      setAudioBlob(blob);
      setAudioURL(URL.createObjectURL(blob));
    };

    mediaRecorder.start();
    setRecording(true);

    // Stop recording after stopRecording is called
    const stopFunc = () => {
      mediaRecorder.stop();
      setRecording(false);
    };
    return stopFunc;
  };

  // Convert audio to text and parse form fields
  const sendVoice = () => {
    if (!audioBlob) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      const nameMatch = transcript.match(/product name[:\-]?\s*([^,]+)/i);
      const quantityMatch = transcript.match(/quantity[:\-]?\s*(\d+)/i);
      const descriptionMatch = transcript.match(/description[:\-]?\s*(.+)/i);

      if (nameMatch) setProductName(nameMatch[1].trim());
      if (quantityMatch) setQuantity(quantityMatch[1].trim());
      if (descriptionMatch) setDescription(descriptionMatch[1].trim());

      setShowMicModal(false);
      setAudioBlob(null);
      setAudioURL(null);
    };

    recognition.onerror = (e) => console.error(e);
    recognition.start();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("description", description);
    images.forEach((image, index) => {
      if (image) formData.append(`image${index + 1}`, image);
    });

    console.log("Submitting order:", { productName, quantity, price, description, images });
    alert("Order submitted successfully!");

    setProductName("");
    setQuantity("");
    setDescription("");
    setImages([null, null, null]);
    setPrice(unitPrice);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-green-400">Add New Order</h1>

      {/* Smart Mic Button */}
      <button
        type="button"
        onClick={() => setShowMicModal(true)}
        className="mb-6 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg shadow-md"
      >
        🎤 Smart Mic
      </button>

      {showMicModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0a] p-6 rounded-2xl w-full max-w-md text-white">
            <h2 className="text-xl font-bold mb-4 text-green-400">Record Your Order</h2>
            
            <div className="flex flex-col items-center gap-4">
              {!recording && (
                <button
                  onClick={async () => {
                    const stop = await startRecording();
                    // Save stop function to stop recording
                    window.stopRecordingFunc = stop;
                  }}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg"
                >
                  Start Recording
                </button>
              )}
              {recording && (
                <button
                  onClick={() => {
                    if (window.stopRecordingFunc) window.stopRecordingFunc();
                  }}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg"
                >
                  Stop Recording
                </button>
              )}
              {audioURL && (
                <audio controls src={audioURL} className="w-full rounded-lg" />
              )}
              {audioURL && (
                <button
                  onClick={sendVoice}
                  className="px-4 py-2 bg-green-400 text-black font-bold rounded-lg"
                >
                  Send
                </button>
              )}
              <button
                onClick={() => {
                  setShowMicModal(false);
                  setAudioBlob(null);
                  setAudioURL(null);
                  setRecording(false);
                }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
          <span className="text-green-400 font-semibold">
            Quantity (per 40 kg)
          </span>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="mt-2 w-full p-3 rounded-lg bg-black border border-green-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </label>

        {/* Price */}
        <label className="block mb-4">
          <span className="text-green-400 font-semibold">Price</span>
          <input
            type="number"
            value={price}
            readOnly
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
