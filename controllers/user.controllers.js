import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const register = async(req,res)=>{
	try{
const {fullname,email,phoneNumber,password,role}=req.body;
   if(!fullname||!email||!phoneNumber||!password||!role){
		return res.status(400).json({message:"all fields are required",
			success:false
		});

	 };
	 const user=await UserActivation.findOne({email});
	 if(user){
		return res.status(400).json({message:"user already exists with this email",success:false});
	 }
	 const hashedPassword=await bcrypt.hash(password,10);
	 await User.create({
		fullname,
		email,
		phoneNumber,
		password:hashedPassword,
		role,
	 });
	 return res.status(201).json({message:"account created successfully now",sucess:true});

	}
	catch(err){
		console.log(err);

	}


}

export const login=async(req,res)=>{
	  try{
const {email,password,role}=req.body;
  if(!email||!password||!role){
		return res.status(400).json({message:"all fields are required",
			success:false
		});

	};
	  let user =await User.findOne({email});
		if(!user){
			return res.status(400).json({message:"user does not exista with this email",
				success:false
			});
		

		}
		const ispasswordmatch =await bcrypt.compare(password,user.password);
		if(!ispasswordmatch){
			return res.status(400).json({message:"user does not exista with this email",
				success:false
			});

		}
		// check role is correct ornot 
		if(user.role!==role){
			return res.status(400).json({message:"please make sure you are logging in from right portal",success:false});
		}
		const tokendata={
			userId:user._id
		}
		const token =await jwt.sign(tokendata,process.env.JWT_SECERT,{expiresIn:'1d'});
		user={
			_id:user._id,
			fullname:user.fullname,
			email:user.email,
			phoneNumber:user.phoneNumber,
			role:user.role,
			profile:user.profile
		}
	   return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:'strict'}).json({
			message:`Welcome back ${user.fullname}`,
			success:true,
		 })

		}
		catch(err){
			console.log(err);
			return res.status(500).json({message:"something went wrong",success:false});

		}
}
export const logout=async(req,res)=>{
	try{
		return res.status(200).cookie("token","",{maxAge:0,httpsOnly:true,sameSite:'strict'}).json({
			message:"logout successfully",
			success:true,
		})

	}
	catch(err){
		console.log(err);
		return res.status(500).json({message:"something went wrong",success:false});

	}
}
 export const updateprofile=async(req,res)=>{
	try{
       const {fullname,email,phoneNumber,bio,skills}=req.body;
			 if(!fullname||!email||!phoneNumber||!bio||!skills){
				return res.status(400).json({message:"something is missing",success:false});
			 };
			 const skillsArray=skills.split(",");
			 const userId=req.id;
			 let user=await User.findById(userId);
			 if(!user){
				return res.status(404).json({message:"user not found",success:false});
			 }
			 user.fullname=fullname;
			 user.email=email;
			 user.phoneNumber=phoneNumber;
			 user.profile.bio=bio;
			 user.profile.skills=skillsArray;
			 await user.save();
			 user={
				_id:user._id,
				fullname:user.fullname,
				email:user.email,
				phoneNumber:user.phoneNumber,
				role:user.role,
				profile:user.profile

			 }
			 return res.status(200).json({
				 message:"profile updated successfully",
				 success:true,
				 user,
				 success:true

			 })


	}
	catch(err){
		console.log(err);
		return res.status(500).json({message:"something went wrong",success:false});
	}
 };
