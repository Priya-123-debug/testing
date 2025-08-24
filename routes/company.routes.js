
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";

import { getCompany } from "../controllers/company.controller.js";
import { registercompany,updateCompany } from "../controllers/company.controller.js";

const router=express.Router();
router.route("/register").post(isAuthenticated,registercompany);
router.route("/get").post(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompany);
router.route("/profile/update").put(isAuthenticated,updateCompany);
export default router;

