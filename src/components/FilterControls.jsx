"use client"



export default function FilterControls({ setFilter, filter }) {
    function toggleFilter(value) {
        if (filter.includes(value)) {
            setFilter(filter.filter(currentStatus => currentStatus !== value));
        } else {
            setFilter([...filter, value]);
        }
    }
    return (
        <fieldset className="absolute top-16 right-6 z-500 bg-white rounded-lg p-2 ">
            <legend>Apply a filter:</legend>
            <div>
                <input type="checkbox" id="active" name="active" checked={filter.includes("ACTIVE")} onChange={() => toggleFilter("ACTIVE")}
                />
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
            </fieldset>
    )
}