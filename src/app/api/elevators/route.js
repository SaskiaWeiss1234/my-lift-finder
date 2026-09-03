import dbConnect from "../../../../db/dbConnect";
import Elevator from "../../../../db/models/elevators";
import { syncElevators } from "../../../../db/syncElevators.js";

export async function GET() {
    await dbConnect();
    //Get newest elevators timestamp
    const newestElevator = await Elevator.findOne().sort({ lastSyncedAt: -1 });
    if (!newestElevator || new Date() - newestElevator.lastSyncedAt > 900000) {
        // If the newest elevator is older than 15 minutes or there are no elevators, sync elevators
         await syncElevators();
        }
        const elevators = await Elevator.find().sort({ lastSyncedAt: -1 });
        return Response.json(elevators);
    
}
