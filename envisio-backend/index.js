import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import patientAppRoutes from "./routes/patientAppRoutes.js";
import testResultAppRoutes from "./routes/testResultAppRoutes.js";
import predictTestRoute from "./routes/predictTestRoute.js";

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

//middleware for parsing body
app.use(express.json());

// Middleware for handling CORS POLICY
// const corsOpts = {
//   origin: '*',
//   credentials: true,
//   methods: ['GET','POST','PUT','PATCH'],
//   allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin'],
//   exposedHeaders: ['Content-Type', 'Access-Control-Allow-Origin']
// };
app.use(cors({origin: '*'}));

//routes for apis
app.use("/api/v2/auth", authRoutes);
app.use("/api/v2/", patientAppRoutes);
app.use("/api/v2/patient", testResultAppRoutes);
app.use("/api/v2/predict", predictTestRoute);

mongoose
  .connect(process.env.mongoDBURL)
  .then(() => {
    app.listen(port);
  })
  .catch((error) => {
    return { message: error.message };
  });

export default app;
