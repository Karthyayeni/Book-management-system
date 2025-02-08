import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";



dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/books", bookRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect("mongodb://localhost:27017/bookstore", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.log(err));
