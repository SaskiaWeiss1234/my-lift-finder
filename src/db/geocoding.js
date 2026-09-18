import { readFullStations } from "db-hafas-stations";

export async function getAllStations() {
    const stations = [];
    for await (const station of readFullStations()) {
        if (
            station.location &&
            station.location.latitude >= 50.75 &&
            station.location.latitude <= 51.10 &&
            station.location.longitude >= 6.60 &&
            station.location.longitude <= 7.35
        ) {
            stations.push({
                lat: station.location.latitude,
                lon: station.location.longitude,
                name: station.name,
            });
        }
    }
    return stations;
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
    return nearest?.name || "Unknown Location";
}

