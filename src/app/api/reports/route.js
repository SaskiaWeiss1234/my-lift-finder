import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const session = await getServerSession(authOptions);
if (!session) {
    return Response.json({ message: "Unauthorized" }, {status: 401 });
}
if (!elevatorId || !userId) {
    return Response.json()
}