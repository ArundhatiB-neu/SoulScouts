import { createSlice } from '@reduxjs/toolkit';

const coachSlice = createSlice({
  name: 'coaches',
  initialState: {
    list: [],
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