"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
    return (
        <MapContainer 
        center={[50.9413, 6.9583]}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
        >
        <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             />
        </MapContainer>
    );
}