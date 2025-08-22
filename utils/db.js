import mongoose from "mongoose";
const connectdb=async ()=>{
	try{
		await mongoose.connect(process.env.MONOGO_URL);
		console.log("mongodb connected");
	}
	catch(err){
		console.log(err.message);

	}
}
export default connectdb;