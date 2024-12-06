const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
import { usersCollection } from '../../mongo/constants';

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    unique: true, 
    required: true 
   },
  email: { 
    type: String, 
    unique: true, 
    required: true 
   },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['Employee', 'HR', 'WellnessCoach'], 
    required: true 
  },
  isAnonymous: { 
    type: Boolean, 
    default: false 
  },
  notificationPreferences: { 
    emailUpdates: {
      type: Boolean, 
      default: false 
    },
    appNotifications: {
      type: Boolean, 
      default: true
    },
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

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = model(usersCollection, userSchema);

export { User };
