import express from "express";
import { Patient } from "../models/Patient.js";
import verifyToken from "../token/verifyToken.js";

const router = express.Router();

// CREATE PATIENT
router.post("/new-patient", verifyToken, async (request, response) => {
  const token = request.headers.authorization;
  const userId = request.query.userId;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized. Token missing or invalid format.",
      status: 401,
    });
  }

  if (!userId) {
    return response
      .status(400)
      .json({ message: "Missing User ID", status: 400 });
  }

  try {
    const {
      FirstName,
      LastName,
      MaritalStatus,
      DOB,
      Height,
      Weight,
      FamilyMedicalHistory,
    } = request.body;

    // validation
    if (
      !FirstName ||
      !LastName ||
      !MaritalStatus ||
      !DOB ||
      !Height ||
      !Weight ||
      !FamilyMedicalHistory
    ) {
      return response
        .status(400)
        .json({ message: "Please fill in required fields", status: 400 });
    }

    const newPatient = {
      FirstName: FirstName,
      LastName: LastName,
      MaritalStatus: MaritalStatus,
      DOB: DOB,
      Height: Height,
      Weight: Weight,
      FamilyMedicalHistory: FamilyMedicalHistory,
      User: userId,
    };

    const appUser = await Patient.create(newPatient);
    return response
      .status(201)
      .json({ message: "Patient Created successfully!", appUser, status: 201 });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// GET ALL PATIENTS
router.get("/all-patients", verifyToken, async (request, response) => {
  try {
    const token = request.headers.authorization;
    const userId = request.query.userId;

    if (!token || !token.startsWith("Bearer ")) {
      return response.status(401).json({
        message: "Unauthorized. Token missing or invalid format.",
        status: 401,
      });
    }

    if (!userId) {
      return response
        .status(400)
        .json({ message: "Missing User ID", status: 400 });
    }

    const patients = await Patient.find({ User: userId });

    return response.status(200).json({
      message: "Patients retrieved successfully",
      patients,
      status: 200,
    });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// GET PATIENT BY ID
router.get("/patient", verifyToken, async (request, response) => {
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

    const patient = await Patient.findById(patientId);

    return response.status(200).json({
      message: "Patient retrieved successfully",
      patient,
      status: 200,
    });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

router.delete("/delete-patient", verifyToken, async (request, response) => {
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

    const deletedItem = await Patient.findByIdAndDelete(patientId);

    if (!deletedItem) {
      return response
        .status(404)
        .json({ message: "Patient not found", status: 404 });
    }

    response
      .status(200)
      .json({ message: "Patient deleted successfully", status: 200 });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

export default router;
