import express from 'express'
import prisma from '../config/couple'
import UserController from '../controllers/user'
import  { verifyToken } from '../middlewares/verifyToken'

const router = express.Router()
const usersController = new UserController(prisma)

router.get('/user', verifyToken(), (req, res) => usersController.getUser(req, res))
router.get('/user/all', (req, res) => usersController.getAll(req, res))
router.delete('/user/all', (req, res) => usersController.deleteAll(req, res))

export default router
