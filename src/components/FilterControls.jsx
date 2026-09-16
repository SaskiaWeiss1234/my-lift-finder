"use client"
import { useState } from "react";


export default function FilterControls({ setFilter, filter }) {
    const [isOpen, setIsOpen] = useState();

    function toggleFilter(value) {
        if (filter.includes(value)) {
            setFilter(filter.filter(currentStatus => currentStatus !== value));
        } else {
            setFilter([...filter, value]);
        }
    }
    return (
<div className="relative">
    <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2">
         <svg width="40px" height="40px" viewBox="0 0 1.2 1.2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.45 0.25a0.05 0.05 0 1 0 0 0.1 0.05 0.05 0 0 0 0 -0.1M0.308 0.25a0.15 0.15 0 0 1 0.283 0H0.95a0.05 0.05 0 1 1 0 0.1h-0.359a0.15 0.15 0 0 1 -0.283 0H0.25a0.05 0.05 0 0 1 0 -0.1zM0.75 0.55a0.05 0.05 0 1 0 0 0.1 0.05 0.05 0 0 0 0 -0.1m-0.142 0a0.15 0.15 0 0 1 0.283 0H0.95a0.05 0.05 0 1 1 0 0.1h-0.058a0.15 0.15 0 0 1 -0.283 0H0.25a0.05 0.05 0 1 1 0 -0.1zM0.45 0.85a0.05 0.05 0 1 0 0 0.1 0.05 0.05 0 0 0 0 -0.1m-0.142 0a0.15 0.15 0 0 1 0.283 0H0.95a0.05 0.05 0 1 1 0 0.1h-0.359a0.15 0.15 0 0 1 -0.283 0H0.25a0.05 0.05 0 1 1 0 -0.1z" fill="#0D0D0D"/></svg> 
    </button>

       {isOpen &&
        (<fieldset className="absolute top-16 right-6 z-[1000] bg-white rounded-lg p-2 ">
            <legend>Apply a filter:</legend>
            <div className="flex flex-col">
                <div>
                    <input type="checkbox" id="active" name="active" checked={filter.includes("ACTIVE")} onChange={() => toggleFilter("ACTIVE")} />
                    <label htmlFor="active">Working</label>
                </div>
                 <div>
                    <input type="checkbox" id="inactive" name="inactive" checked={filter.includes("INACTIVE")} onChange={() => toggleFilter("INACTIVE")} />
                    <label htmlFor="inactive">Broken</label>
                </div>
                <div>
                    <input type="checkbox" id="unknown" name="unknown" checked={filter.includes("UNKNOWN")} onChange={() => toggleFilter("UNKNOWN")} />
                    <label htmlFor="unknown">No Information</label>
                </div>
            </div>
            </fieldset>
        )}
        </div>
    );
}