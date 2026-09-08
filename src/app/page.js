import AuthControl from "@/components/AuthControl";
import MapWrapper from "@/components/MapWrapper";
import dbConnect from "@/db/dbConnect";
import Elevator from "@/db/models/elevators";

export const dynamic = "force-dynamic";


export default async function HomePage() {
  await dbConnect();
const raw = await Elevator.find({}, { _id: 0}).lean();
const elevators = JSON.parse(JSON.stringify(raw));

  return (
    <main className="relative mx-auto max-w-105 h-screen p-4">
      <div className=" absolute top-6 right-6 z-[1000] rounded-lg  p-2 shadow bg-green-600">
        <AuthControl/>
      </div>
      <MapWrapper elevators={elevators} />
    </main>
  );
}