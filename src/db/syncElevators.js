import  dbConnect  from "./dbConnect.js";
import { getElevatorsFromFasta, reshapeElevator } from "./fasta.js";
import Elevator from "./models/elevators.js";
import { getElevatorsFromKVB, reshapeKVBElevator } from "./kvb.js";
import { getAllStations, findNearestStation } from "./geocoding.js"
import Station from "./models/stations.js";

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
    stations = fetchedStations.map(s => ({lat: s.lat, lon: s.lon, name: s.tags?.name}));
    await Station.insertMany(stations);
    }
    
    await Promise.all(
        allElevators.map(async (elevator) =>{
            const stationName = findNearestStation(elevator.latitude, elevator.longitude, stations);
            await Elevator.updateOne(
                {elevatorID: elevator.elevatorID },
                {...elevator, stationName},
                {upsert: true }
            );
        })
    );
return { message: `Synced ${reshapedFasta.length} Fasta + ${reshapedKVB.length} KVB elevators successfully.` };
}
