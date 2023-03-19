import express from "express";

import {verifyToken} from "../middlewares/verifyToken";
import ContactController from "../controllers/contact";
import prisma from "../config/couple";

const router = express.Router();
const contactController = new ContactController(prisma);
const baseUrl = "/contact";

router.get(`${baseUrl}`, verifyToken(), (req, res) => contactController.getContacts(req, res));
router.post(`${baseUrl}`, verifyToken(), (req, res) => contactController.createContact(req, res));

export default router;
