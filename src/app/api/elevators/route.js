export async function GET(request) {
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
    return new Response(`FaSta error: ${response.status}`, { status: response.status });
}
    const data = await response.json();

    return Response.json(data);
}
