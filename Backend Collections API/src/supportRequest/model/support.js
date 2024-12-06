const mongoose = require('mongoose');
import { supportRequest, usersCollection } from '../../mongo/constants';

const supportRequestSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: usersCollection, 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    isResolved: { 
        type: Boolean, 
        default: false 
    },
    response: { 
        type: String, 
        default: null 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    resolvedAt: { 
        type: Date, 
        default: null 
    },
  });
  
const SupportRequest = model(supportRequest, supportRequestSchema);

export { SupportRequest };