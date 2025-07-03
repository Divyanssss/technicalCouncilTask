import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from './routes/userRoutes.js';
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/events", eventRoutes);
app.use('/users', userRoutes);

connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log("Server started on PORT:", PORT);
  });
});

