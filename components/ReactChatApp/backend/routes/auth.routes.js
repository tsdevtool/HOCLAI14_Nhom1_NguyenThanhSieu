import express from "express";
import {login, logout, signup} from "../controllers/auth.controller.js"

const router = express.Router();

// router.get("/login", login);

// router.get("/logout", logout); 

router.post("/signup", signup);

export default router;