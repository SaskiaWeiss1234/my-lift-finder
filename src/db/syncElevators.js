import  dbConnect  from "./dbConnect.js";
import { getElevatorsFromFasta, reshapeElevator } from "./fasta.js";
import Elevator from "./models/elevators.js";
import { getElevatorsFromKVB, reshapeKVBElevator } from "./kvb.js";
import { getAllStations, findNearestStation } from "./geocoding.js"


export async function syncElevators() {
    await dbConnect();
    const rawFasta = await getElevatorsFromFasta();
    const reshapedFasta = rawFasta.map(reshapeElevator);
    const rawKVB = await getElevatorsFromKVB();
    const reshapedKVB = rawKVB.map(reshapeKVBElevator);

    const allElevators = [...reshapedFasta, ...reshapedKVB];
    const stations = await getAllStations();

    for (const elevator of allElevators) {
        const stationName = findNearestStation(elevator.latitude, elevator.longitude, stations);
        await Elevator.updateOne(
            { elevatorID: elevator.elevatorID },
            {...elevator, stationName },
            { upsert: true }
        );
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
return { message: `Synced ${reshapedFasta.length} Fasta + ${reshapedKVB.length} KVB elevators successfully.` };
}
