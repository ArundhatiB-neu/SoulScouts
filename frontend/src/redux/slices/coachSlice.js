import { createSlice } from '@reduxjs/toolkit';

const coachSlice = createSlice({
  name: 'coaches',
  initialState: {
    list: [
      {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@email.com',
        phoneNumber: '+1 (234) 567-8900',
        specialization: 'Stress Management',
        companyId: '123',
        companyName: 'TechCorp'
      },
      {
        id: 2,
        name: 'Sarah Wilson',
        email: 'sarah.wilson@email.com',
        phoneNumber: '+1 (345) 678-9012',
        specialization: 'Work-Life Balance',
        companyId: '123',
        companyName: 'TechCorp'
      },
      {
        id: 3,
        name: 'Michael Brown',
        email: 'michael.brown@email.com',
        phoneNumber: '+1 (456) 789-0123',
        specialization: 'Career Development',
        companyId: '',
        companyName: 'Unassigned'
      }
    ],
    loading: false,
    error: null
  },
  reducers: {
    addCoach: (state, action) => {
      state.list.push(action.payload);
    },
    updateCoach: (state, action) => {
      const index = state.list.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteCoach: (state, action) => {
      state.list = state.list.filter(c => c.id !== action.payload);
    },
    setCoaches: (state, action) => {
      state.list = action.payload;
    },
    assignCompany: (state, action) => {
      const { coachId, companyId, companyName } = action.payload;
      const coach = state.list.find(c => c.id === coachId);
      if (coach) {
        coach.companyId = companyId;
        coach.companyName = companyName;
      }
    }
  }
});

export const { addCoach, updateCoach, deleteCoach, setCoaches, assignCompany } = coachSlice.actions;
export default coachSlice.reducer;