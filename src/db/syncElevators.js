import  dbConnect  from "./dbConnect.js";
import { getElevatorsFromFasta, reshapeElevator } from "./fasta.js";
import Elevator from "./models/elevators.js";
import { getElevatorsFromKVB, reshapeKVBElevator } from "./kvb.js";
import { getAllStations, findNearestStation } from "./geocoding.js"
import Station from "./models/stations.js";
import { normalizeDescription } from "./normalize.js";

export async function syncElevators() {
    await dbConnect();
    const rawFasta = await getElevatorsFromFasta();
    const reshapedFasta = rawFasta.map(reshapeElevator);
    const rawKVB = await getElevatorsFromKVB();
    const reshapedKVB = rawKVB.map(reshapeKVBElevator);

    const allElevators = [...reshapedFasta, ...reshapedKVB];
    let stations = await Station.find({});
    if (stations.length === 0) {  
    const fetchedStations = await getAllStations();
    stations = fetchedStations;
    await Station.insertMany(stations);
    }
    
    await Promise.all(
        allElevators.map(async (elevator) =>{
            const stationName = findNearestStation(elevator.latitude, elevator.longitude, stations);

            const existing = await Elevator.findOne({ elevatorID: elevator.elevatorID });
            let description = elevator.description;
            let descriptionNormalized = existing?.descriptionNormalized || false;

            if(!descriptionNormalized) {
                description = await normalizeDescription(elevator.description);
                descriptionNormalized = true;
            }
            await Elevator.updateOne(
                {elevatorID: elevator.elevatorID },
                {...elevator, stationName, description, descriptionNormalized},
                {upsert: true }
            );
        })
    );
return { message: `Synced ${reshapedFasta.length} Fasta + ${reshapedKVB.length} KVB elevators successfully.` };
}
