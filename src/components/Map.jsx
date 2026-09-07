"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";



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
    html:`<svg width="24px" height="24px" viewBox="0 0 0.48 0.48" fill="none" 
    xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" 
    d="M0.06 0.18v0.009c0 0.043 0.015 0.084 0.041 0.118L0.24 0.48l0.139 -0.173A0.189 0.189 0 0 0 0.42 0.189V0.18A0.18 0.18 0 0 0 0.06 0.18m0.18 0.06a0.06 0.06 0 1 0 0 -0.12 0.06 0.06 0 0 0 0 0.12" fill=${color} fill-rule="evenodd"/>
    </svg>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });
}
        





export default function Map({ elevators }) {
    return (
        <MapContainer 
        center={[50.942519, 6.958543]}
        zoom={13}
        className="h-full w-full rounded-xl"
        maxBounds={[[50.83, 6.70], [51.02, 7.24],   
  ]}     
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