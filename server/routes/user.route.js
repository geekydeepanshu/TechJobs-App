import express from "express"
import { Login, logout, SignUp } from "../controllers/user.controller.js";
import { authUser } from "../middleware/user.js";

const router = express.Router();

router.post("/signup",SignUp);
router.post("/login",Login);
router.get("/logout",logout);

export { router }