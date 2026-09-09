import bcrypt from 'bcryptjs';
import dbConnect from '@/db/dbConnect';
import User from '@/db/models/User';

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
  
try {  
    await User.create({ name, email, password: hashedPassword });
    return Response.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    return Response.json({ message: "Failed to create user"}, {status: 500});
  }}