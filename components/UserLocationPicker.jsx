"use client"; 

import { useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import axios from "axios";

export default function UserLocationPicker() {
  const [location, setLocation] = useState({ lat: 24.8607, lng: 67.0011 });
  const [address, setAddress] = useState("");
  const [selected, setSelected] = useState(false);

  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  // When marker is dragged or map is clicked
  const handleMapClick = async (lngLat) => {
    const { lat, lng } = lngLat;
    setLocation({ lat, lng });
    setSelected(true);

    // Reverse geocode to get address
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.features && data.features.length > 0) {
      setAddress(data.features[0].place_name);
    } else {
      setAddress("");
    }
  };

  const saveLocation = async () => {
    if (!selected) return alert("Select a location first!");
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/farmer/save-location`, {
        latitude: location.lat,
        longitude: location.lng,
        address,
        token: localStorage.getItem("token")
      });
      alert("Location saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving location");
    }
  };

  return (
    <div>
      <h2>Pick Your Farm Location</h2>
      <button className="my-10" onClick={saveLocation}>Save Location</button>
      <Map
        initialViewState={{
          latitude: location.lat,
          longitude: location.lng,
          zoom: 12,
        }}
        style={{ width: "100%", height: "400px" }}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11" 
        onClick={(e) => handleMapClick(e.lngLat)}
      >
        <Marker
          latitude={location.lat}
          longitude={location.lng}
          draggable
          onDragEnd={(e) => handleMapClick(e.lngLat)}
        />
      </Map>

      <div style={{ marginTop: 20 }}>
        <p>
          <strong>Selected Address:</strong> {address || "None"}
        </p>
        <p>
          <strong>Latitude:</strong> {location.lat}, <strong>Longitude:</strong>{" "}
          {location.lng}
        </p>
        
      </div>
    </div>
  );
}
