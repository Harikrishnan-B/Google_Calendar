import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// Get events filtered by roomId
router.get("/", async (req, res) => {
  try {
    const { roomId } = req.query;
    const filter = roomId ? { roomId: Number(roomId) } : {};
    const events = await Event.find(filter);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create or update an event
router.post("/", async (req, res) => {
  try {
    const eventData = req.body;
    console.log("Received event data:", eventData); // Debug log

    if (eventData._id) {
      // Update existing event
      const id = eventData._id;
      delete eventData._id; // Remove _id from update data
      const updatedEvent = await Event.findByIdAndUpdate(id, eventData, { new: true });
      if (!updatedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }
      console.log("Updated event:", updatedEvent); // Debug log
      return res.status(200).json(updatedEvent);
    }

    // Create new event
    const event = new Event({
      title: eventData.title,
      date: eventData.date,
      startTime: eventData.startTime,
      endTime: eventData.endTime,
      description: eventData.description,
      color: eventData.color || "#4CAF50",
      roomId: eventData.roomId, // Ensure roomId is saved
    });

    const newEvent = await event.save();
    console.log("Created event:", newEvent); // Debug log
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error saving event:", error);
    res.status(400).json({ message: error.message });
  }
});

// Get a single event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an event
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;