
import jwt from "jsonwebtoken";
const isAuthenticated=async(req,res,next)=>{
	try{
   const token=req.cookies.token;
	 if(!token){
		return res.status(401).json({message:"you are not authenticated",success:false});
	 }
	 const decoded=jwt.verify(token,process.env.JWT_SECERT);
	 if(!decoded){
		return res.status(401).json({message:"you are not authenticated",success:false});
	 };
	 req.id=decoded.userId;
	 next();

	}
	catch(err){
		console.log(err);
		return res.status(500).json({message:"internal server error",success:false});
	}
}
export default isAuthenticated;