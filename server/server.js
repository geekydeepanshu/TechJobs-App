import express from 'express';
import dotenv from "dotenv"
import cors from "cors"
import fs from 'fs';
import { ConnectDB } from './DB/db.js';
import { router } from './routes/user.route.js';
import { recruiter } from './routes/recruiter.route.js'
import cookieParser from 'cookie-parser';
import swaggerUi from "swagger-ui-express";
import { Jobrouter } from './routes/job.route.js';

const app = express();
dotenv.config(); 
app.use(express.json()); // Handles JSON body parsing
app.use(express.urlencoded({ extended: true })); // Handles URL-encoded data
app.use(cors());
app.use(cookieParser()); 

// Mongo DB connection
ConnectDB();

const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf-8"));

// Setup Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
console.log("✅ Swagger API Docs available at: http://localhost:8000/api-docs");

const port = process.env.PORT || 5000

//user routers
app.use("/api/user",router);
// recruiter router
app.use("/api/recruiter",recruiter)
// Jobs routes
app.use("/api/jobs",Jobrouter)

app.get("/",(req,res) => {
    res.send("Server is ready");
})

app.listen(port,() => {
    console.log(`Server is running port ${port}`);
})