import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {
    addEmployee: (state, action) => {
      state.list.push(action.payload);
    },
    updateEmployee: (state, action) => {
      const index = state.list.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteEmployee: (state, action) => {
      state.list = state.list.filter(e => e.id !== action.payload);
    },
    setEmployees: (state, action) => {
      state.list = action.payload;
    },
    assignCoach: (state, action) => {
      const { employeeId, coachId, coachName } = action.payload;
      const employee = state.list.find(e => e.id === employeeId);
      if (employee) {
        employee.coachId = coachId;
        employee.coachName = coachName;
      }
    }
  }
});

export const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  setEmployees,
  assignCoach
} = employeeSlice.actions;

export default employeeSlice.reducer;