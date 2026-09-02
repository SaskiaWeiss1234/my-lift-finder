import dbConnect from "../../../../db/dbConnect";
import Elevator from "../../../../db/models/elevators";

export async function GET() {
    await dbConnect();
const elevators = await Elevator.find();
return Response.json(elevators);
}
