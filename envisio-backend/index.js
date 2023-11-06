import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { User } from "./models/User.js";
import { PORT, mongoDBURL } from "./config.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

//middleware for parsing body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

//routes for apis
app.use("/api/v2/auth", authRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app connected to db");
    app.listen(PORT);
  })
  .catch((error) => {
    response.status(500).send({ message: error.message });
    console.log(error);
  });
