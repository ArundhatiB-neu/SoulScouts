const mongoose = require('mongoose');
import { coachFeedback, programCollection, usersCollection } from '../../mongo/constants';

const coachFeedbackSchema = new mongoose.Schema({
  coachId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: usersCollection, 
    required: true 
  },
  programId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: programCollection, 
    required: true 
},
  feedback: { 
    type: String, 
    required: true 
},
  createdAt: { 
    type: Date, 
    default: Date.now 
},
});

const coachFeedback = model(coachFeedback, coachFeedbackSchema);

export { coachFeedback };
