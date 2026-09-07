import  dbConnect  from "./dbConnect.js";
import { getElevatorsFromFasta, reshapeElevator } from "./fasta.js";
import Elevator from "./models/elevators.js";
import { getElevatorsfromKVB, reshapeKVBElevator } from "./kvb.js";



export async function syncElevators() {
    await dbConnect();
    const rawFasta = await getElevatorsFromFasta();
    const reshapedFasta = rawFasta.map(reshapeElevator);
    const rawKVB = await getElevatorsfromKVB();
    const reshapedKVB = rawKVB.map(reshapeKVBElevator);

    const allElevators = [...reshapedFasta, ...reshapedKVB];

    
    


    for (const elevator of allElevators) {
        await Elevator.updateOne(
            { elevatorID: elevator.elevatorID },
            elevator,
            { upsert: true }
        );
    }
return { message: `Synced ${reshapedFasta.length} Fasta + ${reshapedKVB.length} KVB elevators successfully.` };
}
