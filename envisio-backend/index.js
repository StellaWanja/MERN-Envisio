import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";
import authRoutes from "./routes/authRoutes.js";
import patientAppRoutes from "./routes/patientAppRoutes.js";
import testResultAppRoutes from "./routes/testResultAppRoutes.js";
import predictTestRoute from "./routes/predictTestRoute.js";

const app = express();

//middleware for parsing body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());


//routes for apis
app.use("/api/v2/auth", authRoutes);
app.use("/api/v2/", patientAppRoutes);
app.use("/api/v2/patient", testResultAppRoutes);
app.use("/api/v2/predict", predictTestRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => {
    response.status(500).send({ message: error.message });
  });

export default app;