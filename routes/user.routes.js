import express from "express";
import {register,login, updateprofile} from "../controllers/user.controllers.js";
const router=express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/update").post(updateprofile);
export default router;