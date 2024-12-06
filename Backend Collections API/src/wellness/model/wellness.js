const mongoose = require('mongoose');
import { wellnessEntry, usersCollection } from '../../mongo/constants';


const wellnessEntrySchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: usersCollection, 
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    mood: { 
        type: String, 
        enum: ['Happy', 'Neutral', 'Sad'], 
        required: true 
    },
    note: {
        type: String, 
        required: false,
    },
    stressLevel: { 
        type: Number, 
        min: 1, 
        max: 10, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
      },
      updatedAt: { 
        type: Date, 
        default: Date.now 
      },
  });
  
 const wellness = model(wellnessEntry, wellnessEntrySchema);

 export { wellness }