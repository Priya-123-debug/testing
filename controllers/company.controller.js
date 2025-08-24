import { Company } from "../models/Company.model.js";
import { User } from "../models/user.model.js";

// export const registercompany=async(req,res)=>{
// 	try{
// 		const {companyName}=req.body;
// 		if(!companyName){
// 			return res.status(400).json({message:"company name is required",success:false});
// 		}
// 		let company=await Company.findOne({name:companyName});
// 		if(company){
// 			return res.status(400).json({message:"company already exists with this name",sucess:false});
// 		};
// 		company =await Company.create({
// 			name:companyName,
// 			userId:req.id,
// 		})

// 	}
// 	catch(err){
// 		console.log(err);
// 	}
// }
export const registercompany = async (req, res) => {
	    console.log("BODY RECEIVED:", req.body);
  console.log("REQ.ID:", req.id);
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({ message: "Company name is required", success: false });
    }

    const existingCompany = await Company.findOne({ name: companyName });
    if (existingCompany) {
      return res.status(400).json({ message: "Company already exists with this name", success: false });
    }

    const company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({ message: "Company registered successfully", success: true, company });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
export const getCompany=async(req,res)=>{
	try{
		const userId=req.id;
		const companies= await Company.find({userId});
		if(!companies){
			return res.status(404).json({message:"no company found",success:false});

		}
		return res.status(200).json({message:"company found",companies,success:true});

	}
	catch(err){
		console.log(err);
	}
}
 export const getCompanyById=async(req,res)=>{
	try{
		const Companyid=req.params.id;
		const company=await Company.findById(Companyid);
		   if(!company){
				return res.status(404).json({message:"no company found",success:false});
			 }
			 return res.status(200).json({message:"company found",success:true,company});

	}
	catch(err){
		console.log(err);
	}
 }  
 export const updateCompany=async(req,res)=>{
	try{

		const {name,description,website,location}=req.body;
		const file=req.file;
		const updateData={name,description,website,location};
		const company=await Company.findByIdAndUpdate(req.params.id,updateData,{new:true});
		if(!company){
			return res.status(404).json({message:"no company found",success:false});
		}
		return res.status(200).json({message:"company updated successfully",success:true})
	}
	catch(err){
		console.log(err);
	}
 }


