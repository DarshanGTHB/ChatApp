import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routers/auth.route.js";
import messageRoutes from "./routers/message.route.js";
import { app, server } from "./lib/socket.js";

configDotenv();

// For __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://chatapp-bojl.onrender.com",
  credentials: true
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
console.log(path.join(__dirname, "dist"))
// Serve static files from Vite build (dist folder)
app.use(express.static(path.join(__dirname, "dist")));

// For any other route, serve index.html (SPA support)
app.get(/^(?!\/api)(?!\/socket\.io).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is listening at port: ${PORT}`);
  connectDB();
});
