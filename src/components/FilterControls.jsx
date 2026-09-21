"use client"
import { useState } from "react";


export default function FilterControls({ setFilter, filter }) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleFilter(value) {
        if (filter.includes(value)) {
            setFilter(filter.filter(currentStatus => currentStatus !== value));
        } else {
            setFilter([...filter, value]);
        }
    }
    return (
<div className="relative">
    <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2" aria-label="Toggle Filters">
         <svg width="28px" height="28px" viewBox="0 0 1.2 1.2" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
         <path d="M0.45 0.25a0.05 0.05 0 1 0 0 0.1 0.05 0.05 0 0 0 0 -0.1M0.308 0.25a0.15 0.15 0 0 1 0.283 0H0.95a0.05 0.05 0 1 1 0 0.1h-0.359a0.15 0.15 0 0 1 -0.283 0H0.25a0.05 0.05 0 0 1 0 -0.1zM0.75 0.55a0.05 0.05 0 1 0 0 0.1 0.05 0.05 0 0 0 0 -0.1m-0.142 0a0.15 0.15 0 0 1 0.283 0H0.95a0.05 0.05 0 1 1 0 0.1h-0.058a0.15 0.15 0 0 1 -0.283 0H0.25a0.05 0.05 0 1 1 0 -0.1zM0.45 0.85a0.05 0.05 0 1 0 0 0.1 0.05 0.05 0 0 0 0 -0.1m-0.142 0a0.15 0.15 0 0 1 0.283 0H0.95a0.05 0.05 0 1 1 0 0.1h-0.359a0.15 0.15 0 0 1 -0.283 0H0.25a0.05 0.05 0 1 1 0 -0.1z" fill="white"/></svg> 
    </button>

       {isOpen &&
        (<fieldset className="absolute top-12 left-0 z-[1000] bg-surface rounded-lg p-4 w-52 shadow-lg ">
            <legend className="text-sm font-semibold text-foreground px-1 bg-surface rounded border border-border-subtle mt-3 ">Apply a filter:</legend>
            <div className="flex flex-col gap-2 mt-1">
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="active" name="active" checked={filter.includes("ACTIVE")} onChange={() => toggleFilter("ACTIVE")} className="accent-primary" />
                    <label className="text-foreground text-sm" htmlFor="active">Working</label>
                </div>
                 <div className="flex items-center gap-2">
                    <input type="checkbox" id="inactive" name="inactive" checked={filter.includes("INACTIVE")} onChange={() => toggleFilter("INACTIVE")} className="accent-primary" />
                    <label className="text-foreground text-sm" htmlFor="inactive">Broken</label>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="unknown" name="unknown" checked={filter.includes("UNKNOWN")} onChange={() => toggleFilter("UNKNOWN")} className="accent-primary" />
                    <label className="text-foreground text-sm" htmlFor="unknown">No Information</label>
                </div>
            </div>
            </fieldset>
        )}
        </div>
    );
}
