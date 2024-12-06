import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware';
const { register, login, logout, updateUserPreference, getUserProfile } = require('./controllers/user.controllers');

const userRouter = express.Router();

userRouter.get('/', verifyToken);
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.get('/:id', verifyToken, getUserProfile);
userRouter.put('/:id', verifyToken, updateUserPreference);



export default userRouter;
