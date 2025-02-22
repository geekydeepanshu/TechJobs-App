import express from "express"
import { Login, logout, SignUp } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup",SignUp);
router.post("/login",Login);
router.post("/logout",logout);

export { router }