
import { Company } from "../models/Company.model.js";
import { Job } from "../models/job.model.js";   // 👈 Capitalized model
import { User } from "../models/user.model.js";

// ---------------------- POST JOB ----------------------
export const postjob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    // Validation
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res
        .status(400)
        .json({ message: "please fill all the fields", success: false });
    }

    // Create Job
    const newJob = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,   // 👈 match schema field name
      createdBy: userId,
    });

    return res.status(201).json({
      message: "new job created successfully",
      job: newJob,
      success: true,
    });
  } catch (err) {
    console.log("❌ Error in postjob:", err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// ---------------------- GET ALL JOBS ----------------------
export const getalljobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query).populate({path:"Company"}).sort({createdAt:-1});

    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "no jobs found", success: false });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (err) {
    console.log("❌ Error in getalljobs:", err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// ---------------------- GET JOB BY ID ----------------------
export const getjobbyid = async (req, res) => {
	console.log("getjobbyid called with id",req.params.id);
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res
        .status(404)
        .json({ message: "job not found", success: false });
    }

    return res.status(200).json({ job, success: true });
  } catch (err) {
    console.log("❌ Error in getjobbyid:", err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// ---------------------- GET JOBS BY ADMIN ----------------------
export const getAdminjobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ createdBy: adminId });

    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "no jobs found", success: false });
    }

    return res.status(200).json({ jobs, success: true });
  } catch (err) {
    console.log("❌ Error in getAdminjobs:", err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
