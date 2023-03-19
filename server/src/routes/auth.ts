import express from "express";
import prisma from "../config/couple";

import AuthController from "../controllers/auth";
import {validate} from "../middlewares/validate";
import {authRequest} from "../mongo/valid";

const router = express.Router();
const authController = new AuthController(prisma);
const baseUrl = "/auth";

router.post(`${baseUrl}/login`, validate(authRequest), (req, res) =>
  authController.login(req, res)
);
router.post(`${baseUrl}/register`, validate(authRequest), (req, res) =>
  authController.register(req, res)
);
router.get(`${baseUrl}/logout`, (req, res) => authController.logout(req, res));

export default router;
