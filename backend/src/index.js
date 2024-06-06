import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import patientAppRoutes from "./routes/patientAppRoutes.js";
import testResultAppRoutes from "./routes/testResultAppRoutes.js";
import predictTestRoute from "./routes/predictTestRoute.js";
import connectDB from "./db.js";

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

// app.use(cors({ credentials: true }));
app.use(cors());

//middleware for parsing body
app.use(express.json());

//routes for apis
app.use("/api/v2/auth", authRoutes);
app.use("/api/v2/", patientAppRoutes);
app.use("/api/v2/patient", testResultAppRoutes);
app.use("/api/v2/predict", predictTestRoute);

app.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`);
  await connectDB();
})

