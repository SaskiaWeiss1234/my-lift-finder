import mongoose from "mongoose";

const { Schema } = mongoose;

const elevatorSchema = new Schema(
  {
    elevatorID: {
      type: String,
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
    source: {
      type: String, 
    },
  },

  { timestamps: true },
);

const Elevator = mongoose.models.Elevator || mongoose.model("Elevator", elevatorSchema);

export default Elevator;
