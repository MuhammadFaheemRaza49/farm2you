"use client";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";

export default function OrderMap({ latitude, longitude }) {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!latitude || !longitude) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude], // center on provided coords
      zoom: 13,
    });

    // Add marker
    new mapboxgl.Marker({ color: "#22c55e" })
      .setLngLat([longitude, latitude])
      .addTo(map);

    return () => map.remove(); // cleanup
  }, [latitude, longitude]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-64 rounded-lg border border-green-600 shadow-lg"
    />
  );
}
