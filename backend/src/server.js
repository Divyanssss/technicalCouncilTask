import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from './routes/userRoutes.js';
import { connectDB } from "./config/db.js";
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use("/events", eventRoutes);
app.use('/users', userRoutes);
app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log("Server started on PORT:", PORT);
  });
});

