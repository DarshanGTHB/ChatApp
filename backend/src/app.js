import express from "express";
import cors from "cors";

import { configDotenv } from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"; 


import authRoutes from "./routers/auth.route.js"
import messageRoutes from "./routers/message.route.js"



configDotenv();

const app = express();
    
app.use(express.json()); // to use this const {fullName, email, password} = req.body;
app.use(cookieParser()); // const token = req.cookies.jwt;
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
// to use Base4 image
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("App is listening at port : ", PORT);
  connectDB();
});
