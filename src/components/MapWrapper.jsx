"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import FilterControls from "./FilterControls";


const Map = dynamic(() => import("@/components/Map"), { 
  ssr: false,
  loading: () => <p>Loading map...</p>
});

export default function MapWrapper({ elevators }) {
  const [ mounted, setMounted ] = useState(false);
  const [filter, setFilter] = useState(["ACTIVE", "INACTIVE", "UNKNOWN"])

 

   
   
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <p>Loading map...</p>;
  }
    return (
    <>
    <FilterControls filter={filter} setFilter={setFilter} />
    <Map elevators={elevators} filter={filter} />
    </>)
}