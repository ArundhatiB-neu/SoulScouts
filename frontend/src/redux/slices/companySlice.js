import { createSlice } from '@reduxjs/toolkit';

export const companySlice = createSlice({
  name: 'companies',
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {
    addCompany: (state, action) => {
      state.list.push(action.payload);
    },
    updateCompany: (state, action) => {
      const index = state.list.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteCompany: (state, action) => {
      state.list = state.list.filter(c => c.id !== action.payload);
    },
    setCompanies: (state, action) => {
      state.list = action.payload;
    }
  }
});

export const { addCompany, updateCompany, deleteCompany, setCompanies } = companySlice.actions;
export default companySlice.reducer;