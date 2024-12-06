const mongoose = require('mongoose');
import { usersCollection, notificationCollection } from '../../mongo/constants';

const notificationSchema = new mongoose.Schema({
  senderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: usersCollection, 
    required: true 
},
  content: { 
    type: String, 
    required: true 
},
  audience: { 
    type: [String], 
    required: true 
},
  createdAt: { 
    type: Date, 
    default: Date.now 
},
});

const Notification = model(notificationCollection, notificationSchema);
 
export { Notification };