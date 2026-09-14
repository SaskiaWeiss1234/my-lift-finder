export async function getStationName(latitude, longitude) {
    try { 
    const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
        { headers: { "User-Agent": "MyLiftFinder"}}
    );
    const data = await response.json();
    return data.display_name || "Unknown Location";
} catch (error) {
    return "Unknown Location";
}
}