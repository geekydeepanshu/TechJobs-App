import express from 'express';
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from 'body-parser';
import { ConnectDB } from './DB/db.js';
import { router } from './routes/user.route.js';

const app = express();
dotenv.config();
app.use(express.json()); // Handles JSON body parsing
app.use(express.urlencoded({ extended: true })); // Handles URL-encoded data
app.use(cors());

// Mongo DB connection
ConnectDB();

const port = process.env.PORT || 5000

// routers
app.use("/api/user",router);
app.use("/api/login",router);
app.use("/api/logout",router);

app.get("/",(req,res) => {
    res.send("Server is ready");
})

app.listen(port,() => {
    console.log(`Server is running port ${port}`);
})