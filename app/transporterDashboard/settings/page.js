"use client";

import dynamic from "next/dynamic";


const TransporterLocationPicker = dynamic(() => import("../../../components/TransporterLocationPicker"), { ssr: false });

export default function SettingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <TransporterLocationPicker />
    </div>
  );
}
