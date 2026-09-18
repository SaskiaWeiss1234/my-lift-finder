import User from "@/db/models/User";
import dbConnect from "@/db/dbConnect";

export async function POST(request) {
    const { token } = await request.json();

    if (!token) {
        return Response.json({ message: "Token is required"}, { status: 400});
    }
    await dbConnect();
    const user =  await User.findOne({
        verificationToken: token, 
    })
    if (!user) {
      return Response.json({ message: "Invalid or exired verification link"}, { status: 400});  
    }
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    return Response.json( { 
        message: "Email verified successfully!",  
        email: user.email 
    }, { status: 200 });
}