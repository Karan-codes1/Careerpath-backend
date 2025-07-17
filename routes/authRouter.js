import { Router } from "express";import express from 'express';
import { signupValidation,loginValidation } from "../Middlewares/AuthValidation.js";
import { signup } from "../controller/AuthController.js";
const router = express.Router();

router.post('/Signup',signupValidation,signup);
router.post('/login',loginValidation);

export default router;

