import MapWrapper from "@/components/MapWrapper";
import dbConnect from "@/db/dbConnect";
import Elevator from "@/db/models/elevators";


export default async function HomePage() {
  await dbConnect();
const elevators = await Elevator.find({}, { _id: 0}).lean().exec();  // Fetch all elevators from the database

  return (
    <main>
      <MapWrapper elevators={elevators} />
    </main>
  );
}