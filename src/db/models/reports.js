import mongoose from "mongoose";


const { Schema } = mongoose;

const reportSchema = new Schema(
     
    {elevatorID: {
        type: String,
        required: true,
        
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },
    state: {
        type: String,
        required: true,
        enum: ["ACTIVE", "INACTIVE"]
    },
    comment: {
        type: String,
        maxLength: [ 150, "Comments should not exceed 150 characters"],
    },
},
    {
        timestamps: true
    }

);

const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);

export default Report;