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
        placeholder="Search by station or platform..."
        className="w-full rounded p-3"
        />
        {searchTerm && (
            <button 
            type="button"
            onClick={(e) => setSearchTerm("")}
            className="absolute right-2 top-1/2 -translate-y-1/1 text-gray-500"
            >
                Clear
            </button>
        )}
    </div>
  );
}