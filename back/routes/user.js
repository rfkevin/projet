import express from "express";
import {signin, signup, getUserList, deleteUser} from '../controllers/user.js';
import admin from '../middleware/admin.js';
const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/getUserList', admin ,  getUserList);
router.post('/deleteUser', admin , deleteUser);
export default router;
