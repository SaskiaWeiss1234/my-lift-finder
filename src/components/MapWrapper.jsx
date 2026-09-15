"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import FilterControls from "./FilterControls";
import SearchBar from "./SearchBar";


const Map = dynamic(() => import("@/components/Map"), { 
  ssr: false,
  loading: () => <p>Loading map...</p>
});

export default function MapWrapper({ elevators }) {
  const [ mounted, setMounted ] = useState(false);
  const [filter, setFilter] = useState([])
const [searchTerm, setSearchTerm] = useState("");


 

   
   
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <p>Loading map...</p>;
  }

    return (
    <div className="relative h-full">
    <FilterControls filter={filter} setFilter={setFilter} />
    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    <Map elevators={elevators} filter={filter} searchTerm={searchTerm} />
    </div>)
}