import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectdb from"./utils/db.js";
import userRoutes from "./routes/user.routes.js";
import companyRoutes from "./routes/company.routes.js";
import jobRoutes from "./routes/job.routes.js";
connectdb();
import applicationRoute from "./routes/application.route.js";




const corsOptions={
	origin:process.env.CLIENT_URL,
	credentials:true,
}


const app=express();
// middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
const PORT=process.env.PORT||5000;
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/company",companyRoutes);
app.use("/api/v1/job",jobRoutes);
app.use("/api/v1/application",applicationRoute);


app.listen(PORT,()=>{
	console.log(`server running on port ${PORT}...`);
})
