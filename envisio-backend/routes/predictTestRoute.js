import express from "express";
import verifyToken from "../verifyToken.js";

const router = express.Router();

// Simple rule-based breast cancer prediction
const predictBreastCancer = (Age, TumorSize) => {
  if (Age <= 40 && TumorSize <= 2) {
    return "Benign";
  } else if (Age > 40 && TumorSize > 2) {
    return "Malignant";
  } else {
    return "Indeterminate";
  }
};

// API endpoint for breast cancer prediction
router.post("/predict-test", verifyToken, async (request, response) => {
  try {
    const token = request.headers.authorization;
    const patientId = request.query.patientId;

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized. Token missing or invalid format.",
        status: 401,
      });
    }

    if (!patientId) {
      return response
        .status(400)
        .json({ message: "Missing Patient ID", status: 400 });
    }

    const { Age, TumorSize } = request.body;

    if (!Age || !TumorSize) {
      return response.status(400).json({
        message: "Age and tumorSize are required parameters.",
        status: 400,
      });
    }

    const prediction = await predictBreastCancer(Age, TumorSize);

    const utcDate = new Date();
    const localDate = new Date(utcDate.getTime());

    const formattedDate = localDate.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const date = formattedDate.replace(',', ' at');

    return response
      .status(201)
      .json({ message: "Test successfull", prediction, date: date, status: 201 });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

export default router;
