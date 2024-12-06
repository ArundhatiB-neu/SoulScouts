import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware';
const { addEntry, getEntries, updateEntry, deleteEntry } = require('./controllers/wellness.controller')


const wellnessRouter = express.Router();

wellnessRouter.post('/entry', verifyToken, addEntry);
wellnessRouter.get('/entry', verifyToken, getEntries);
wellnessRouter.put('/entry/:id', verifyToken, updateEntry);
wellnessRouter.delete('/entry/:id', verifyToken, deleteEntry);

export default wellnessRouter