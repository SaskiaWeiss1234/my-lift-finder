export async function getElevatorsFromFasta() {
    const clientID = process.env.DB_CLIENT_ID;
    const apiKey = process.env.DB_API_KEY;

    const url = "https://apis.deutschebahn.com/db-api-marketplace/apis/fasta/v2/facilities?type=ELEVATOR&area=6.920,50.915,6.990,50.965";

    const response = await fetch(url, {
        headers: {
            "DB-Client-ID": clientID,
            "DB-Api-Key": apiKey,
        }
    });

    if (!response.ok) {
        throw new Error(`FaSta request failed: ${response.status}`);
    }

    const data = await response.json();
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