import express from "express";
import { configDotenv } from "dotenv";
import authRoutes from "./routers/auth.route.js"
import { connectDB } from "./lib/db.js";
configDotenv();

const app = express();
    
app.use(express.json()); // to use this const {fullName, email, password} = req.body;
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("App is listening at port : ", PORT);
  connectDB();
});
