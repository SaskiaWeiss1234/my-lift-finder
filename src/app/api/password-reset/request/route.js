import crypto from "crypto";
import dbConnect from "@/db/dbConnect";
import User from "@/db/models/User.js";
import { sendEmail } from "@/db/email";

export async function POST(request) {
    const { email } = await request.json();
    if (!email) {
        return Response.json({ message: "Email is required" }, { status: 400 });
    } 
    
    await dbConnect();
    const user = await User.findOne({ email });
    
    if (user) {
        const token = crypto.randomBytes(32).toString("hex");
        const expiry = new Date(Date.now() + 60 * 60 * 1000);

        user.resetToken = token;
        user.resetTokenExpiry = expiry;
        await user.save();

        const resetLink = `http://localhost:3000/reset-password?token=${token}`;
        await sendEmail(
            user.email,
            "Reset your password",
            `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 1 hour.</p>`
        );
    }
    return Response.json({ message:"If an account exists, a reset link has been sent."})
}


