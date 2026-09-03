import  dbConnect  from "./dbConnect.js";
import { getElevatorsFromFasta, reshapeElevator } from "./fasta.js";
import Elevator from "./models/elevators.js";



export async function syncElevators() {
    await dbConnect();
    const rawElevators = await getElevatorsFromFasta();
    const reshaped = rawElevators
    .map(reshapeElevator)
    .filter((e) => e.elevatorID != null); // Filter out elevators with null elevatorID


    for (const elevator of reshaped) {
        await Elevator.updateOne(
            { elevatorID: elevator.elevatorID },
            elevator,
            { upsert: true }
        );
    }
return { message: `Synced ${reshaped.length} elevators successfully.` };
}