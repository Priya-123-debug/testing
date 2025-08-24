import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminjobs, getalljobs, getjobbyid,postjob } from "../controllers/job.controller.js";
const router=express.Router();
router.route("/post").post(isAuthenticated,postjob);
router.route("/get").get(isAuthenticated,getalljobs);
router.route("/getadminjobs").get(isAuthenticated,getAdminjobs);
router.route("/get/:id").get(isAuthenticated,getjobbyid);

export default router;