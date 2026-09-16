"use client"

export default function SearchBar({ searchTerm, setSearchTerm}) {
  return (
    <div className="relative">
        <label htmlFor="elevator-search" className="sr-only">
            Search for Stations
        </label>
        <input 
        id="station-search"
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by station..."
        className="rounded p-3 border-2"
        />
        {searchTerm && (
            <button 
            type="button"
            onClick={(e) => setSearchTerm("")}
            className="absolute right-2 top-1/2 -translate-y-1/1 text-gray-500"
            >
                <svg width="30" height="30" viewBox="0 0 0.9 0.9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m.3.3.3.3m0-.3L.3.6" stroke="#000" stroke-width=".075" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        )}
    </div>
  );
}