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
    return Response.json({ message: "Failed to create report"}, {status: 500});
}}