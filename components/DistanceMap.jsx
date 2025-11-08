"use client";

import { useState, useEffect } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl/mapbox";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";

export default function DistanceMap({ userLocation, farmerLocation }) {
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const [route, setRoute] = useState(null);

  // Fetch route whenever locations change
  useEffect(() => {
    if (!userLocation || !farmerLocation) return;

    const fetchRoute = async () => {
      try {
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.longitude},${userLocation.latitude};${farmerLocation.longitude},${farmerLocation.latitude}?geometries=geojson&access_token=${MAPBOX_TOKEN}`;
        const res = await axios.get(url);

        if (res.data.routes && res.data.routes.length > 0) {
          setRoute(res.data.routes[0].geometry);
        }
      } catch (err) {
        console.error("Failed to fetch route:", err);
      }
    };

    fetchRoute();
  }, [userLocation, farmerLocation, MAPBOX_TOKEN]);

  if (!userLocation || !farmerLocation) return null;

  return (
    <Map
      initialViewState={{
        latitude: (userLocation.latitude + farmerLocation.latitude) / 2,
        longitude: (userLocation.longitude + farmerLocation.longitude) / 2,
        zoom: 12,
      }}
      style={{ width: "100%", height: "400px" }}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {/* User Marker */}
      <Marker
        latitude={userLocation.latitude}
        longitude={userLocation.longitude}
        color="blue"
      />

      {/* Farmer Marker */}
      <Marker
        latitude={farmerLocation.latitude}
        longitude={farmerLocation.longitude}
        color="red"
      />

      {/* Route Layer */}
      {route && (
        <Source id="route" type="geojson" data={{ type: "Feature", geometry: route }}>
          <Layer
            id="routeLayer"
            type="line"
            paint={{
              "line-color": "#00FF00",
              "line-width": 4,
            }}
          />
        </Source>
      )}
    </Map>
  );
}
