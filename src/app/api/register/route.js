import bcrypt from 'bcryptjs';
import dbConnect from '@/db/dbConnect';
import User from '@/db/models/User';
import { sendEmail } from "@/db/email.js"
import crypto from "crypto";
 
export async function POST(req) {
    const { name, email, password } = await req.json();

      if (!name || !email || !password) {
        return Response.json({ message: "Name, Email and Password are required"}, {status: 400});
    }
  
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {

        return  Response.json({ message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex")
  
try {  
    await User.create({ name, email, password: hashedPassword,  verificationToken });
    const confirmationLink = `http://localhost:3000/verify-email?token=${verificationToken}`
try {     
    await sendEmail(
      email,
      "Registration confirmed!",
      `<p>Click <a href=${confirmationLink}>here</a> to Verify your Email address.</p>`
    );
  } catch (error) {
    console.error("Failed to send verification email:", error)
  }
    return Response.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    return Response.json({ message: "Failed to create user"}, {status: 500});
  }
}