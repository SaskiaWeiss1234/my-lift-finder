import { getElevatorsFromFasta, reshapeElevator } from "../../../../db/fasta";
import Elevator from "../../../../db/models/elevators";
import dbConnect from "../../../../db/dbConnect";

export async function GET() {
  await dbConnect();

  const rawElevators = await getElevatorsFromFasta();     
  
  const reshaped = rawElevators.map(reshapeElevator);

  for (const elevator of reshaped) {
  await Elevator.updateOne(
    { elevatorID: elevator.elevatorID },
    elevator,
    { upsert: true }
  );
  }
  return Response.json({ message: `Synced ${reshaped.length} elevators successfully.` });
}

