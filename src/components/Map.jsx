"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import ElevatorPopup from "./ElevatorPopup";
import { createIcon } from "@/utils/mapUtils";


export default function Map({ elevators, filter, searchTerm }) {
   
     const filteredElevators =
     elevators.filter(elevator => {  
    const statusMatch = filter.length === 0 || filter.includes(elevator.state);
    const searchMatch = searchTerm === "" || elevator.stationName?.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
});

   
    return (
        <MapContainer 
        zoomControl={false}
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
             {filteredElevators.map(elevator => (
                <Marker
                key={elevator.elevatorID}
                position={[elevator.latitude, elevator.longitude]}
                icon={createIcon(elevator.state)}
                >
             <ElevatorPopup elevator={elevator} />
            </Marker>
                ))}
        </MapContainer>
        
    );
}