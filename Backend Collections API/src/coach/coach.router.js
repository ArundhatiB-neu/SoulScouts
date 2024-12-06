import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware';
const { addFeedback, getFeedback  } = require('./controllers/coach.controllers');

const coachRouter = express.Router();

coachRouter.post('/feedback', verifyToken, addFeedback)
coachRouter.get('/feedback', verifyToken, getFeedback)


export default coachRouter;