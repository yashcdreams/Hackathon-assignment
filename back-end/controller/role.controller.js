import roleModel from "../model/role.Model.js";
import {
  NO_CONTENT,
  NOT_FOUND,
  OK,
  INTERNAL_SERVER_ERROR,
} from "../utils/Constants.js";
import sendResponse from "../utils/response.processor.js";

export const getRoles = async (req, res) => {
  try {
    const userRole = await roleModel.find();
    sendResponse(req, res, OK, "userRole received successfully", userRole);
  } catch (err) {
    sendResponse(req, res, NOT_FOUND, "Error receiving userRole");
  }
};

export const createRole = async (req, res) => {
  try {
    const { roleName } = req.body;

    if (!roleName) {
      return sendResponse(req, res, NOT_FOUND, "Role name is required");
    }
    const userRole = new roleModel({ roleName });
    await userRole.save();
    sendResponse(req, res, OK, "Role created successfully", userRole);
  } catch (err) {
    console.log({ err });
    sendResponse(req, res, INTERNAL_SERVER_ERROR, "Error creating role");
  }
};

export const updateRole = async (req, res) => {
  try {
    const existingRole = await roleModel.findById(req.body.id);

    if (existingRole) {
      const updatedRole = await roleModel.findOneAndUpdate(
        { _id: existingRole._id },
        { roleName: req.body.roleName, status: req.body.status }
      );
      sendResponse(req, res, OK, "role Updated Successfully");
    }
  } catch (err) {
    console.log({ err });
    sendResponse(req, res, NOT_FOUND, "Error Updating role");
  }
};

export const getRole = async (req, res) => {
  try {
    if (!req.params.id) {
      return sendResponse(req, res, BAD_REQUEST, "Role ID is required");
    }

    const existingRole = await roleModel.findById(req.params.id);
    if (existingRole) {
      sendResponse(req, res, OK, "Role received successfully", existingRole);
    } else {
      sendResponse(req, res, NO_CONTENT, "Role data not found");
    }
  } catch (err) {
    console.error("Error retrieving role:", err);
    sendResponse(req, res, NOT_FOUND, "Error receiving role");
  }
};

export const deleteRole = async (req, res) => {
  try {
    const role = await roleModel.findByIdAndDelete(req.params.id);
    if (role) {
      sendResponse(req, res, OK, "Role deleted successfully");
    } else {
      sendResponse(req, res, NO_CONTENT, "Role not found");
    }
  } catch (err) {
    console.log(err);
    sendResponse(req, res, INTERNAL_SERVER_ERROR, "Error deleting role");
  }
};
