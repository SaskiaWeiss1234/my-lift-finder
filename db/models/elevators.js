import mongoose from "mongoose";

const { Schema } = mongoose;

const elevatorSchema = new Schema(
  {
    elevatorID: {
      type: Number,
      required: true,
      unique: true, 
    },
    longitude: {
      type:Number,  
    },
    latitude: {
      type:Number,
    },
    state: {
      type: String,
        enum: ["ACTIVE", "INACTIVE", "UNKNOWN" ],
    },
    stateExplanation: {
      type: String,
      
    },
    description: {
      type: String,
    },
    stationNumber: {
      type: Number,      
    },
    lastSyncedAt: {
      type: Date, 
    },
  },

  { timestamps: true },
);

const Elevator = mongoose.models.Elevator || mongoose.model("Elevator", elevatorSchema);

export default Elevator;
