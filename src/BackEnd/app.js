import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173', // Exact frontend origin
  methods: ['GET', 'POST', 'OPTIONS'], 
  allowedHeaders: ['Content-Type'], 
  credentials: true, 
}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});