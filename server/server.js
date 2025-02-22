import express from 'express';
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from 'body-parser';
import { ConnectDB } from './DB/db.js';
import { router } from './routes/user.route.js';
import { Jobrouter } from "./routes/job.route.js"
import cookieParser from 'cookie-parser';


const app = express();
dotenv.config();
app.use(express.json()); // Handles JSON body parsing
app.use(express.urlencoded({ extended: true })); // Handles URL-encoded data
app.use(cors());
app.use(cookieParser()); 

// Mongo DB connection
ConnectDB();

const port = process.env.PORT || 5000

//user routers
app.use("/api/user",router);
// job routes
app.use("/api/job",Jobrouter);

app.get("/",(req,res) => {
    res.send("Server is ready");
})

app.listen(port,() => {
    console.log(`Server is running port ${port}`);
})