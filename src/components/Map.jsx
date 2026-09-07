"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// Fix for default marker icon issue in Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
console.log("icon value:", icon);

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