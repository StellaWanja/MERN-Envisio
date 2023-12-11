import express from "express";
import { TestResult } from "../models/TestResult.js";
import verifyToken from "../token/verifyToken.js";

const router = express.Router();

// SAVE TEST
router.post("/save-test", verifyToken, async (request, response) => {
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

  try {
    const { Date, Result } = request.body;

    // validation
    if (!Date || !Result) {
      return response
        .status(400)
        .json({ message: "Please fill in required fields", status: 400 });
    }

    const newTest = {
      Date: Date,
      Result: Result,
      Patient: patientId,
    };

    const test = await TestResult.create(newTest);
    return response
      .status(201)
      .json({ message: "Test Saved successfully!", test, status: 201 });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// GET ALL TESTS
router.get("/all-tests", verifyToken, async (request, response) => {
  try {
    const token = request.headers.authorization;
    const patientId = request.query.patientId;

    if (!token || !token.startsWith("Bearer ")) {
      return response.status(401).json({
        message: "Unauthorized. Token missing or invalid format.",
        status: 401,
      });
    }

    if (!patientId) {
      return response
        .status(400)
        .json({ message: "Missing Patient ID", status: 400 });
    }

    const tests = await TestResult.find({ Patient: patientId });

    return response.status(200).json({
      message: "Tests retrieved successfully",
      tests,
      status: 200,
    });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

export default router;
