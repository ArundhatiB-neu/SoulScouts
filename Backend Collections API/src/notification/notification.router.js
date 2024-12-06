import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware';
const { sendNotification, getNotifications } = require('./controllers/notification.controllers');


const notificationRouter = express.Router();

notificationRouter.post('/', verifyToken, sendNotification);
notificationRouter.get('/', verifyToken, getNotifications);



export default notificationRouter;