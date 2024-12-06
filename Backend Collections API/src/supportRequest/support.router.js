import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware';
const { addSupportRequest, getSupportRequests, resolveSupportRequest } = require('./controllers/support.controllers');

const supportRouter = express.Router();

supportRouter.get('/request', verifyToken, getSupportRequests);
supportRouter.post('/request', verifyToken, addSupportRequest);
supportRouter.put('/request/:id/respond', verifyToken, resolveSupportRequest);

export default supportRouter;