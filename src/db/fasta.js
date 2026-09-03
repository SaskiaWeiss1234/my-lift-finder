export async function getElevatorsFromFasta() {
    const clientID = process.env.DB_CLIENT_ID;
    const apiKey = process.env.DB_API_KEY;

    if (!clientID || !apiKey) {
        throw new Error("DB_CLIENT_ID or DB_API_KEY is not set in environment variables.");
    }

    const url = "https://apis.deutschebahn.com/db-api-marketplace/apis/fasta/v2/facilities?type=ELEVATOR&area=6.920,50.915,6.990,50.965";

    const response = await fetch(url, {
        headers: {
            "DB-Client-ID": clientID,
            "DB-Api-Key": apiKey,
             "Accept": "application/json",
}
    });

    if (!response.ok) {
        throw new Error(`FaSta request failed: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
        throw new Error("Unexpected response format from FaSta API.");
    }
    return data;
}

export function reshapeElevator(facility) {
    return {
        elevatorID: facility.equipmentnumber,
        longitude: facility.geocoordX,
        latitude: facility.geocoordY,
        state: facility.state,
        stateExplanation: facility.stateExplanation,
        description: facility.description,
        stationNumber: facility.stationnumber,
        lastSyncedAt: new Date(),
        };
}