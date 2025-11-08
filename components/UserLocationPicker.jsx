"use client";

import { useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import axios from "axios";
import toast from "react-hot-toast";
import "mapbox-gl/dist/mapbox-gl.css"; // ✅ Make sure this is included

export default function UserLocationPicker({setLocationData}) {
  const [location, setLocation] = useState(null); // ✅ No marker initially
  const [address, setAddress] = useState("");
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const handleMapClick = async ({ lat, lng }) => {
    setLocation({ lat, lng });

    // Reverse Geocode to get address
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`;
    const res = await fetch(url);
    const data = await res.json();
    setAddress(data.features?.[0]?.place_name || "");
  };

  const saveLocation = async () => {
    if (!location) return toast.error("Select a location first!");

    setLocationData({
        latitude: location.lat,
        longitude: location.lng,
        address})

      
  };

  const pickCurrentLocation = () => {
    if (!navigator.geolocation) return toast.error("Your device does not support GPS.");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        handleMapClick({ lat, lng });
      },
      () => toast.error("Unable to access location. Allow permission in browser settings.")
    );
  };

  return (
    <div>
      <h1 className="text-3xl mb-4">Pick Your Location to deliver your order</h1>

      <div className="my-4 flex gap-4">
        <button className="bg-green-900 px-4 py-1 rounded hover:bg-green-950" onClick={saveLocation}>
          Save Selected Location
        </button>
        <button className="bg-blue-700 px-4 py-1 rounded hover:bg-blue-800" onClick={pickCurrentLocation}>
          Use My Current Location
        </button>
      </div>

      <Map
        initialViewState={{
          latitude: location?.lat || 24.8607,
          longitude: location?.lng || 67.0011,
          zoom: 12,
        }}
        style={{ width: "100%", height: "400px" }}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onClick={(e) => handleMapClick({ lat: e.lngLat.lat, lng: e.lngLat.lng })}
      >
        {location && (
          <Marker
            latitude={location.lat}
            longitude={location.lng}
            draggable
            onDragEnd={(e) => handleMapClick({ lat: e.lngLat.lat, lng: e.lngLat.lng })}
          />
        )}
      </Map>

      <div className="mt-4">
        <p><strong>Address:</strong> {address || "Not selected"}</p>
        {location && (
          <p>
            <strong>Lat:</strong> {location.lat} | <strong>Lng:</strong> {location.lng}
          </p>
        )}
      </div>
    </div>
  );
}
