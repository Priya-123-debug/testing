import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectdb from"./utils/db.js";
import userRoutes from "./routes/user.routes.js";
connectdb();



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


app.listen(PORT,()=>{
	console.log(`server running on port ${PORT}...`);
})
