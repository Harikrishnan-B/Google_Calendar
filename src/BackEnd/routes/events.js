import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const event = new Event({
    title: req.body.title,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,     
    description: req.body.description,
    color: req.body.color,
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    await event.remove();
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;