import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        FirstName: {
            type: String,
            required: true
        },
        LastName: {
            type: String,
            required: true
        },
        HospitalName: {
            type: String,
            required: true
        },
        Email: {
            type: String,
            required: true,
            unique: true
        },
        Password: {
            type: String,
            required: true
        },
        ConfirmPassword: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model("User", userSchema);
