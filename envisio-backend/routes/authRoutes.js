import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { RANDOM_TOKEN } from "../token/tokenGenerator.js";
import verifyToken from "../token/verifyToken.js";

const router = express.Router();

// REGISTER
router.post("/register", async (request, response) => {
  try {
    const {
      FirstName,
      LastName,
      HospitalName,
      Email,
      Password,
      ConfirmPassword,
    } = request.body;

    // validation
    if (
      !FirstName ||
      !LastName ||
      !HospitalName ||
      !Email ||
      !Password ||
      !ConfirmPassword
    ) {
      return response
        .status(400)
        .json({ message: "Please fill in required fields", status: 400 });
    }

    if (/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+\.[A-Za-z]/.test(Email) !== true) {
      return response
        .status(400)
        .json({ message: "Please enter a valid email address", status: 400 });
    }

    if (
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}$/.test(
        Password
      ) !== true
    ) {
      return response.status(400).json({
        message: `Password must be at least 8 characters long with at least 1 digit, a special character, an uppercase letter, and a lowercase letter`,
        status: 400,
      });
    }

    if (Password !== ConfirmPassword) {
      return response
        .status(400)
        .json({ message: "Passwords entered do not match", status: 400 });
    }

    // hash passwords
    const hashPassword = await bcrypt
      .hash(Password, 10)
      .then((hashPassword) => {
        return hashPassword;
      })
      .catch((error) =>
        response.status(500).json({
          message: "Password was not hashed successfully",
          status: 500,
          error: error,
        })
      );

    const hashConfirmPassword = await bcrypt
      .hash(ConfirmPassword, 10)
      .then((hashPassword) => {
        return hashPassword;
      })
      .catch((error) =>
        response.status(500).json({
          message: "Password was not hashed successfully",
          error: error,
          status: 500,
        })
      );

    //check if user exists
    const userExists = await User.findOne({ Email });
    if (userExists !== null) {
      return response
        .status(400)
        .json({ message: "User already exists. Kindly login", status: 400 });
    }

    //create user
    const newUser = {
      FirstName: FirstName,
      LastName: LastName,
      HospitalName: HospitalName,
      Email: Email,
      Password: hashPassword,
      ConfirmPassword: hashConfirmPassword,
    };

    const appUser = await User.create(newUser);
    return response
      .status(201)
      .json({ message: "Registration successful!", appUser, status: 201 });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

//LOGIN
router.post("/login", async (request, response) => {
  try {
    const { Email, Password } = request.body;

    //validation
    if (!Email || !Password) {
      return response
        .status(400)
        .json({ message: "Please fill in required fields", status: 400 });
    }
    if (Password.length < 6) {
      return response
        .status(400)
        .json({ message: "Password less than 6 characters", status: 400 });
    }
    if (/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+\.[A-Za-z]/.test(Email) !== true) {
      return response
        .status(400)
        .json({ message: "Please enter a valid email address", status: 400 });
    }

    //check if user exists
    const user = await User.findOne({ Email });

    if (user === null) {
      return response
        .status(404)
        .json({ message: "User not found", status: 404 });
    } else {
      //email exists and check password
      bcrypt
        .compare(Password, user.Password)
        .then((passwordCheck) => {
          //if passwords do not match
          if (!passwordCheck) {
            return response.status(400).json({
              message: "Invalid credentials",
              status: 400,
              error,
            });
          }

          //if they do, create jwt
          const token = jwt.sign(
            { userId: user._id, userEmail: user.Email },
            RANDOM_TOKEN,
            { expiresIn: "1h" }
          );

          //   return success response
          return response.status(200).json({
            message: "Login Successful",
            email: user.Email,
            userID: user._id,
            token: token,
          });
        })
        // catch error if any issue comes up in regards
        .catch((error) => {
          response.status(400).json({
            message: "Invalid Credentials",
            error,
            status: 400,
          });
        });
    }
  } catch (error) {
    response.status(500).json({ message: error.message, status: 500 });
  }
});

router.get("/user", verifyToken, async (request, response) => {
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

    const user = await User.findById(userId);

    return response.status(200).json({
      message: "User retrieved successfully",
      user,
      status: 200,
    });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

//FORGOT PASSWORD
router.post("/forgot-password", async (request, response) => {
  try {
    const { Email } = request.body;
    //validation
    if (!Email) {
      return response
        .status(400)
        .json({ message: "Please fill in required fields", status: 400 });
    }
    if (/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+\.[A-Za-z]/.test(Email) !== true) {
      return response
        .status(400)
        .json({ message: "Please enter a valid email address", status: 400 });
    }

    //check if user exists
    const user = await User.findOne({ Email });

    if (user === null) {
      return response.status(404).json({
        message: "No user associated with the email provided",
        status: 404,
      });
    } else {
      return response
        .status(200)
        .json({ message: "Proceed to reset password", status: 200 });
    }
  } catch (error) {
    response.status(500).json({ message: error.message, status: 500 });
  }
});

//RESET PASSWORD
router.patch("/reset-password", async (request, response) => {
  try {
    const { Email, Password, ConfirmPassword } = request.body;
    //validation
    if (!Email) {
      return response
        .status(400)
        .json({ message: "Please fill in required fields", status: 400 });
    }
    if (/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+\.[A-Za-z]/.test(Email) !== true) {
      return response
        .status(400)
        .json({ message: "Please enter a valid email address", status: 400 });
    }
    if (
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        Password
      ) !== true
    ) {
      return response.status(400).json({
        message: `Password must be at least 8 characters long with at least 1 digit, a special character, an uppercase letter, and a lowercase letter`,
        status: 400,
      });
    }
    if (Password !== ConfirmPassword) {
      return response
        .status(400)
        .json({ message: "Passwords entered do not match", status: 400 });
    }
    if (Password !== ConfirmPassword) {
      return response
        .status(400)
        .json({ message: "Passwords entered do not match", status: 400 });
    }
    //check if user exists
    const user = await User.findOne({ Email });

    if (user === null) {
      return response.status(404).json({
        message: "No user associated with the email provided",
        status: 404,
      });
    } else {
      // hash passwords
      const hashPassword = await bcrypt
        .hash(Password, 10)
        .then((hashPassword) => {
          return hashPassword;
        })
        .catch((error) =>
          response.status(500).json({
            message: "Password was not hashed successfully",
            status: 500,
            error: error,
          })
        );

      const hashConfirmPassword = await bcrypt
        .hash(ConfirmPassword, 10)
        .then((hashPassword) => {
          return hashPassword;
        })
        .catch((error) =>
          response.status(500).json({
            message: "Password was not hashed successfully",
            error: error,
            status: 500,
          })
        );
      //create user
      const updateUser = {
        Password: hashPassword,
        ConfirmPassword: hashConfirmPassword,
      };

      const appUser = await User.updateMany(updateUser);

      return response
        .status(201)
        .json({ message: "Reset Password successful!", appUser, status: 200 });
    }
  } catch (error) {
    response.status(500).json({ message: error.message, status: 500 });
  }
});

export default router;
