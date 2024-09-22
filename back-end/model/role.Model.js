import { Schema, model } from "mongoose";

const roleSchema = new Schema(
  {
    roleName: { type: String },
    status: { type: Boolean, default: true },
  },
  {
    versionKey: false,
  }
);

const roleModel = model("UserRoles", roleSchema, "UserRoles");
export default roleModel;
