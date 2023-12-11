import mongoose from "mongoose";

const TestResultSchema = mongoose.Schema(
    {
        Date: {
            type: String
        },
        Result: {
            type: String
        },
        Patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient"
        },
    },
    {
        timestamps: true
    }
)

export const TestResult = mongoose.model("TestResult", TestResultSchema);