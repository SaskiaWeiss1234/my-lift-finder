"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// Fix for default marker icon issue in Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";

export function getColorByState(state) {
    if (state === "ACTIVE") {
        return "green";
    }
    if (state === "INACTIVE") {
        return "red";
    } 
    return "gray"; // Default color for unknown states
}
function createIcon(state) {
    const color = getColorByState(state);
    return L.divIcon({
        className: "",
    html:`<svg fill=${color} width="24px" height="24px" viewBox="0 0 0.72 0.72" 
    xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="m0.38 0.683 -0.02 0.017 -0.02 -0.017C0.174 0.538 0.09 0.411 0.09 0.3c0 -0.158 0.123 -0.27 0.27 -0.27s0.27 0.112 0.27 0.27c0 0.111 -0.084 0.238 -0.25 0.383M0.15 0.3c0 0.085 0.069 0.193 0.21 0.32 0.141 -0.127 0.21 -0.234 0.21 -0.32 0 -0.123 -0.095 -0.21 -0.21 -0.21s-0.21 0.087 -0.21 0.21m0.21 -0.15a0.15 0.15 0 1 1 0 0.3 0.15 0.15 0 0 1 0 -0.3m0 0.06a0.09 0.09 0 1 0 0 0.18 0.09 0.09 0 0 0 0 -0.18"/>
    </svg>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });
}
        





export default function Map({ elevators }) {
    return (
        <MapContainer 
        center={[50.9413, 6.9583]}
        zoom={13}
        maxBounds={[
    [50.83, 6.70],   // south-west corner [lat, lng]
    [51.02, 7.24],   // north-east corner [lat, lng]
  ]}
        style={{ height: "100vh", width: "100%" }}
        >
        <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             />
             {elevators.map(elevator => (
                <Marker
                key={elevator.elevatorID}
                position={[elevator.latitude, elevator.longitude]}
                icon={createIcon(elevator.state)}
                >
                <Popup>
                    <div>
                        <h3>{elevator.description}</h3>
                        <p>{elevator.state}</p>
                    </div>
                </Popup>
                </Marker>
             ))}
        </MapContainer>
    );
}