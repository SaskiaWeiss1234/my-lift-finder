import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import Report from "@/db/models/reports";
import dbConnect from "@/db/dbConnect";

export async function DELETE(request, { params }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return Response.json({ message: "Unauthorized"}, { status: 401});
    }
    const { id } = params;
    await dbConnect();

    const report = await Report.findById(id);
    if (!report) {
        return Response.json({ message: "Report not found"}, { status: 404 });
    }
    if (report.userId.toString() !== session.user.id) {
        return Response.json({ message: "Forbidden"}, { status: 403});
    }  
    await Report.findByIdAndDelete(id);
    return Response.json({ message: "Report successfully deleted"}, { status: 200 });
}