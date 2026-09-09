import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Report from "@/db/models/reports";
import dbConnect from "@/db/dbConnect";

export async function POST(request) {
const session = await getServerSession(authOptions);
if (!session) {
    return Response.json({ message: "Unauthorized" }, {status: 401 });
}
const { elevatorID, state, comment } = await request.json();

if (!elevatorID || !state) {
    return Response.json({ message: "ElevatorId and state are required"}, {status: 400});
}
await dbConnect();

try {
    await Report.create({elevatorID, userId: session.user.id, state, comment});
    return Response.json({message: "Report send successfully"}, {status: 201})
} catch (error) {
    console.error("Report creation error:", error);  // ← add this
  return Response.json({ message: "Failed to create report" }, { status: 500 });
}}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const elevatorID = searchParams.get("elevatorID");
    if (!elevatorID) {
        return Response.json({ message: "ElevatorID not found"}, {status: 400})
    }
    try {
        await dbConnect();
        const reports = await Report.find({ elevatorID });
        return Response.json(reports);
    } catch (error) {
        return Response.json({ message: "Failed to fetch reports" }, { status: 500});
    }
}