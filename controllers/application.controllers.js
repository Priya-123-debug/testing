
import {Application} from "../models/application.model.js";
import {Job} from "../models/job.model.js";
import {User} from"../models/user.model.js";




export const applyJob=async(req,res)=>{
	try{
		const userId=req.id;
		const jobId=req.params.id;
		if(!jobId){
			return res.status(400).json({
				message:"job id is required",
				success:false
			})
		};
		const existingapplication=await Application.findOne({job:jobId,applicant:userId});
		if(existingapplication){
			return res.status(400).json({message:"you have already applied for this job ",success:false});

		}
		// check if jobs exists
		const job=await Job.findById(jobId);
		if(!job){
			return res.status(404).json({
				message:"job not found",
				success:false
			})
		}
		// create a new application
		const newapplication =await Application.create({
			job:jobId,
			applicant:userId,
		})
		job.applications.push(newapplication._id);
		await job.save();
		return res.status(201).json({
			message:"job applied successfully",
			success:true
		})

	}
	catch(err){
		console.log(err);
	}
}

export const getAppliedjobs =async(req,res)=>{
	try{
		const userId =req.id;
		const application=await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
			path:'job',
			options:{sort:{createdAt:-1}},
			populate:{
				path:'company',
				options:{sort:{createdAt:-1}},
			}
		});
		if(!application){
			return res.status(404).json({
				message:"no appilication",
				success:false
			})
		}
		return res.status(200).json({
			application,
			success:true
		})

	}
	catch(err){
		console.log(err);
	}
}
// adin dekhega kitna user ne apply kiya hai
export const getApplicants=async(req,res)=>{
	try{
		const jobId =req.params.id;
		const job= await Job.findById(jobId).populate({
			path:'applications',
			options:{sort:{createdAt:-1}},
			populate:{
				path:'applicant',
				  // model: 'User' 
			}

		});
		if(!job){
			   return res.status(404).json({
					message:'Job not found',
					success:false
				 })
		};
		return res.status(200).json({
			job,
			success:true
		});



	}
	catch(err){
		console.log(err);
	}

}
// export const getApplicants = async (req, res) => {
//   try {
//     const jobId = req.params.id;

//     // Fetch all applications for this job and populate applicant info
//     const applications = await Application.find({ job: jobId })
//       .populate('applicant')  // populate User info
//       .sort({ createdAt: -1 });

//     if (!applications || applications.length === 0) {
//       return res.status(404).json({
//         message: "No applicants found for this job",
//         success: false
//       });
//     }

//     return res.status(200).json({
//       applications,   // full applicant info + status
//       success: true
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Server error", success: false });
//   }
// };

export const updateStatus =async (req,res)=>{
	try{
     const {status}=req.body;
		 const applicationId=req.params.id;
		  if(!status){
				return res.status(400).json({
					message:'status is required',
					success:false
				})
			};
			// find the application by appliciant id 
			const application =await Application.findOne({_id:applicationId});
			if(!application){
				return res.status(404).json({
					message:"application not found",
					success:false
				})
			}
			// update the status
			application.status=status.toLowerCase();
			await application.save();
			return res.status(200).json({
				 message:"status updated successfully",
				 success:true
			});


	}
	catch(err){
		console.log(err);
	}
}