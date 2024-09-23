import bcrypt from "bcrypt";
import userModel from "../model/user.Model.js";
import {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  NO_CONTENT,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
} from "../utils/Constants.js";
import sendResponse from "../utils/response.processor.js";
import { generateToken } from "../utils/jwt.js";

const jwtSecretKey = "digitalflake";

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.aggregate([
      {
        $lookup: {
          from: "UserRoles",
          localField: "roleId",
          foreignField: "_id",
          as: "userRole",
        },
      },
      {
        $unwind: {
          path: "$userRole",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          mobile: 1,
          status: 1,
          userRole: "$userRole.roleName",
        },
      },
    ]);
    sendResponse(req, res, OK, "User received successfully", users);
  } catch (err) {
    console.log(err);
    sendResponse(req, res, NOT_FOUND, "Error receiving user");
  }
};

export const getUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return sendResponse(req, res, BAD_REQUEST, "User ID is required");
    }

    const existingUser = await userModel
      .findById(req.params.id)
      .populate("roleId", "roleName");

    if (existingUser) {
      const response = {
        ...existingUser.toObject(),
      };
      sendResponse(req, res, OK, "User received successfully", response);
    } else {
      sendResponse(req, res, NO_CONTENT, "User data not found");
    }
  } catch (err) {
    console.log(err);
    sendResponse(req, res, INTERNAL_SERVER_ERROR, "Error receiving user");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    const password = atob(req.body.password);
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (isPasswordValid) {
        const token = generateToken(
          existingUser._id,
          existingUser.email,
          jwtSecretKey
        );

        sendResponse(req, res, OK, "User logged in successfully", {
          user: existingUser,
          token,
        });
      } else {
        sendResponse(req, res, UNAUTHORIZED, "Enter a valid password");
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new userModel({
        email,
        password: hashedPassword,
      });
      await newUser.save();

      const token = generateToken(newUser._id, newUser.email, jwtSecretKey);

      sendResponse(req, res, CREATED, "User created & logged in successfully", {
        user: newUser,
        token,
      });
    }
  } catch (err) {
    console.error(err);
    sendResponse(req, res, NOT_FOUND, "Error logging in User");
  }
};

export const createUser = async (req, res) => {
  try {
    const reqBody = req.body;
    console.log({ reqBody });
    const newUser = new userModel({
      name: reqBody.name,
      mobile: reqBody.mobile,
      email: reqBody.email,
      roleId: reqBody.userRole.value,
    });
    await newUser.save();
    sendResponse(req, res, OK, "User created Successfully", newUser);
  } catch (err) {
    console.log(err);
    sendResponse(req, res, NOT_FOUND, "Error Updating user");
  }
};

export const updateUser = async (req, res) => {
  try {
    const reqBody = req.body;
    const existingUser = await userModel.findById(reqBody.id);

    if (existingUser) {
      const updates = {};
      if (reqBody.name && reqBody.name !== existingUser.name) {
        updates.name = reqBody.name;
      }
      if (reqBody.email && reqBody.email !== existingUser.email) {
        updates.email = reqBody.email;
      }
      if (reqBody.mobile && reqBody.mobile !== existingUser.mobile) {
        updates.mobile = reqBody.mobile;
      }
      if (
        reqBody.userRole &&
        reqBody.userRole.value !== existingUser.userRole.toString()
      ) {
        updates.userRole = reqBody.userRole.value;
      }
      if (
        typeof reqBody.status !== "undefined" &&
        reqBody.status !== existingUser.status
      ) {
        updates.status = reqBody.status;
      }

      if (Object.keys(updates).length > 0) {
        await userModel.findOneAndUpdate(
          { _id: existingUser._id },
          { $set: updates },
          { new: true }
        );
        sendResponse(req, res, OK, "User Updated Successfully");
      } else {
        sendResponse(req, res, OK, "No changes detected");
      }
    } else {
      sendResponse(req, res, NOT_FOUND, "User not found");
    }
  } catch (err) {
    console.error(err);
    sendResponse(req, res, NOT_FOUND, "Error Updating user");
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (user) {
      sendResponse(req, res, OK, "User deleted successfully");
    } else {
      sendResponse(req, res, NO_CONTENT, "User not found");
    }
  } catch (err) {
    console.log(err);
    sendResponse(req, res, INTERNAL_SERVER_ERROR, "Error deleting user");
  }
};
