import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String }, 
  endTime: { type: String }, 
  description: { type: String },
  color: { type: String, default: "#4CAF50" },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;