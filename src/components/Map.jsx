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
function createIcon(color) {
    return L.divIcon({
        className: "",
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -24],
    });
}


L.Icon.Default.mergeOptions({
     iconRetinaUrl: iconRetina,
    iconUrl: icon,
    shadowUrl: iconShadow,
});


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