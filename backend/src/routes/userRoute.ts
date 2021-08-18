import express from 'express';
const router = express.Router();
// import authMiddleware from '../middlewares/authenticationMiddleware';
import {adduser,getAllUser,login} from "../controllers/userController";




router.get('/',getAllUser);
router.post('/',adduser);
router.post('/login',login);

export default router
