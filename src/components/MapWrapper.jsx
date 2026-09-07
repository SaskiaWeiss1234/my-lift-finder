"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const Map = dynamic(() => import("@/components/Map"), { 
  ssr: false,
  loading: () => <p>Loading map...</p>
});

export default function MapWrapper({ elevators }) {
  const [ mounted, setMounted ] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <p>Loading map...</p>;
  }
    return <Map elevators={elevators} />;
}