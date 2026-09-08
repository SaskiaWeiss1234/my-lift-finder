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
    html:`<svg width="22px" height="22px" viewBox="0 0 0.44 0.44" fill="none" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M0.055 0.165v0.008c0 0.039 0.013 0.077 0.038 0.108L0.22 0.44l0.127 -0.159A0.173 0.173 0 0 0 0.385 0.173V0.165A0.165 0.165 0 0 0 0.055 0.165m0.165 0.055a0.055 0.055 0 1 0 0 -0.11 0.055 0.055 0 0 0 0 0.11" fill=${color} fill-rule="evenodd"/></svg>`,
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