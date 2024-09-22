import express from "express";
import {
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
  getUser,
  createUser,
} from "../controller/user.controller.js";
import {
  createRole,
  deleteRole,
  getRole,
  getRoles,
  updateRole,
} from "../controller/role.controller.js";

const router = express();

router.route("/users").get(getUsers);
router.route("/user/:id").get(getUser);
router.route("/add-user").post(createUser);
router.route("/login").post(loginUser);
router.route("/update-user").put(updateUser);
router.route("/delete-user/:id").delete(deleteUser);

router.route("/roles").get(getRoles);
router.route("/role/:id").get(getRole);
router.route("/add-role").post(createRole);
router.route("/update-role").put(updateRole);
router.route("/delete-role/:id").delete(deleteRole);

export default router;
