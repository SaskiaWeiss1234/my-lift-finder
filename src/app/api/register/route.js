import bcrypt from 'bcrypt';
import dbConnect from '@/db/dbConnect';
import User from '@/db/models/User';

export async function POST(req) {
    const { name, email, password } = await req.json();
  
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {

        return  Response(JSON.stringify({ message: 'User already exists' }), { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword });

    return Response.json({ message: 'User registered successfully' }, { status: 201 });
  }