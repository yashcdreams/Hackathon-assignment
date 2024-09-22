import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String },
    mobile: { type: Number },
    email: { type: String },
    password: { type: String },
    status: { type: Boolean, default: true },
    roleId: { type: Schema.Types.ObjectId, ref: "UserRoles" },
  },
  {
    versionKey: false,
  }
);

const userModel = model("Users", userSchema, "Users");
export default userModel;
