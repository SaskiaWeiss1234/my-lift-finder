import User from "@/db/models/User";
import  bcrypt  from "bcryptjs";
import dbConnect from "@/db/dbConnect";

export async function POST(request) {
    const { token, newPassword } = await request.json();

    if(!token || !newPassword) {
        return Response.json({ message: "NewPassword and token are required"}, { status: 400 });
    }
    
    await dbConnect();
    const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: new Date() },
    });
    if (!user) {
        return Response.json({ message: "Invalid or expired reset link"}, { status: 400 });
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
    return Response.json({ message: "Password reset successfully"}, { status: 200 });
}
