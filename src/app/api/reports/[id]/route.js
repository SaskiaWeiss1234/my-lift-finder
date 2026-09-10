import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import Report from "@/db/models/reports";
import dbConnect from "@/db/dbConnect";

async function getAuthorizedReport(id, session) {
    await dbConnect();
    const report = await Report.findById(id);
    if (!report) {
        return { error: Response.json({ message: "Report not found"}, { status: 404})}
    }
    if (report.userId.toString() !== session.user.id) {
        return {error: Response.json({ message: "Forbidden"}, { status: 403})}
    }
    return { report };
}

export async function DELETE(request, { params }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return Response.json({ message: "Unauthorized"}, { status: 401});
    }
    const  { id } =  await params;
    const { report, error } = await getAuthorizedReport(id, session);
    if (error) {
        return error;
    }  
    await Report.findByIdAndDelete(id);
    return Response.json({ message: "Report successfully deleted"}, { status: 200 });
}

export async function PATCH(request, { params }) {
    
    const session = await getServerSession(authOptions);
     if (!session) {
        return Response.json({ message: "Unauthorized"}, { status: 401});
    }
 const { id } =  await params;
 const { state, comment } = await request.json();
    const { error } = await getAuthorizedReport(id, session);
    if (error) {
        return error;
    }  
    await Report.findByIdAndUpdate(id, { state, comment } );
    return Response.json({ message: "Report updated successfully" }, { status: 200 });
}