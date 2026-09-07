import MapWrapper from "@/components/MapWrapper";
import dbConnect from "@/db/dbConnect";
import Elevator from "@/db/models/elevators";

export const dynamic = "force-dynamic";


export default async function HomePage() {
  await dbConnect();
const raw = await Elevator.find({}, { _id: 0}).lean();
const elevators = JSON.parse(JSON.stringify(raw));

  return (
    <main>
      <MapWrapper elevators={elevators} />
    </main>
  );
}