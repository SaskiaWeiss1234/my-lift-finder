export async function getElevatorsFromKVB() {
    
const locationRes = await fetch("https://data.webservice-kvb.koeln/service/opendata/aufzuege/json");
const outagesRes = await fetch("https://data.webservice-kvb.koeln/service/opendata/aufzugsstoerung/json");

if (!locationRes.ok || !outagesRes.ok ) {
    throw new Error("Failed to fetch data from KVB API.");
}
const locationsData = await locationRes.json();
const outagesData = await outagesRes.json();

if (!locationsData.features || !outagesData.features) {
    throw new Error("Unexpected response format from KVB API.");
}

const brokenIDs = new Set(
    outagesData.features.map((feature) => feature.properties.Kennung)
);

return locationsData.features.map((feature) => {
    const kennung = feature.properties.Kennung;
    const isBroken = brokenIDs.has(kennung);
    return {
        ...feature,
        derivedState: isBroken ? "INACTIVE" : "ACTIVE",
    };
});
}

export function reshapeKVBElevator(feature) {
    return {
        elevatorID: feature.properties.Kennung,
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        state: feature.derivedState,
        description: feature.properties.Bezeichnung,
        stationNumber: Number(feature.properties.Haltestellenbereich),
        source: "KVB",
        lastSyncedAt: new Date(),
        stateExplanation: null, // KVB API does not provide a state explanation
    };
}

