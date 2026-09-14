export async function getAllStations() {
    const query = `[out:json];node["railway"="station"](50.83,6.70,51.02,7.24);out;`
    const url = `https://overpass.private.coffee/api/interpreter?data=${encodeURIComponent(query)}`;

    const response = await fetch(url, {
        headers: { "User-Agent": "MyLiftFinder"}
    });
    const text = await response.text();
    const data = JSON.parse(text);
    return data.elements || [];
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = toRadians(lat2 -lat1);
    const dLon = toRadians(lon2 -lon1);
    const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export function findNearestStation(latitude, longitude, stations) {
    let nearest = null;
    let minDistance = Infinity;

    for (const station of stations) {
        const distance = getDistance(latitude, longitude, station.lat, station.lon);
        if (distance < minDistance) {
            minDistance = distance;
            nearest = station;
        }
    }
    return nearest?.tags?.name || "Unknown Location";
}

