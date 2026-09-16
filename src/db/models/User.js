import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        resetToken: {
            type: String,
        },
        resetTokenExpiry: {
            type: Date,
        },
        verified: {
            type:Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
        },
},
    {
        timestamps: true
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

