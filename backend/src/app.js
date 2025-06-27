import express from "express";


import { configDotenv } from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"


import authRoutes from "./routers/auth.route.js"
import messageRoutes from "./routers/message.route.js"



configDotenv();

const app = express();
    
app.use(express.json()); // to use this const {fullName, email, password} = req.body;
app.use(cookieParser()); // const token = req.cookies.jwt;

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("App is listening at port : ", PORT);
  connectDB();
});
