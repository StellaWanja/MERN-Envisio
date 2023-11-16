import mongoose, { Schema } from "mongoose";

const patientSchema = mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    MaritalStatus: {
      type: String,
      required: true,
    },
    DOB: {
      type: String,
      required: true,
    },
    Height: {
      type: Number,
      required: true,
    },
    Weight: {
      type: Number,
      required: true,
    },
    FamilyMedicalHistory: {
      type: String,
      required: true,
    },
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    TestResults: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestResult"
    },
  },
  {
    timestamps: true,
  }
);

export const Patient = mongoose.model("Patient", patientSchema);
