import mongoose from "mongoose";

const { Schema } = mongoose;

const stationSchema = new Schema({
    lat: Number,
    lon: Number,
    name: String,
}, { timestamps: true });

const Station = mongoose.models.Station || mongoose.model("Station", stationSchema);
export default Station;