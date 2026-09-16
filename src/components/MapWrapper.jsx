"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import FilterControls from "./FilterControls";
import SearchBar from "./SearchBar";
import AuthControl from "./AuthControl";

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
      <div className="absolute top-0 left-0 right-0 z-[1000] flex items-center justify-between gap-2 p-2 bg-black/70">
    <FilterControls filter={filter} setFilter={setFilter} />
    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    <AuthControl />
    </div>
    <Map elevators={elevators} filter={filter} searchTerm={searchTerm} />
    </div>)
}