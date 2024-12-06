const mongoose = require('mongoose');
import { programCollection } from '../../mongo/constants';

const programSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true 
},
  description: { 
    type: String, 
    required: true 
},
  targetAudience: { 
    type: [String], 
    required: true 
},
  startDate: { 
    type: Date, 
    required: true 
},
  endDate: { 
    type: Date, 
    required: true 
},
  createdAt: { 
    type: Date, 
    default: Date.now 
},
});

const program = model(programCollection, programSchema);

export { program };