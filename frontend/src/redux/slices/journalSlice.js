import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entries: [],
  loading: false,
  error: null
};

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addEntry: (state, action) => {
      state.loading = false;
      state.error = null;
      state.entries.push({
        ...action.payload,
        createdTimeStamp: new Date().toISOString(),
        lastEditTimeStamp: new Date().toISOString()
      });
    },
    updateEntry: (state, action) => {
      state.loading = false;
      state.error = null;
      const index = state.entries.findIndex(
        entry => entry.id === action.payload.id && entry.userId === action.payload.userId
      );
      if (index !== -1) {
        state.entries[index] = {
          ...state.entries[index],
          ...action.payload,
          lastEditTimeStamp: new Date().toISOString()
        };
      }
    },
    deleteEntry: (state, action) => {
      state.loading = false;
      state.error = null;
      state.entries = state.entries.filter(
        entry => !(entry.id === action.payload.entryId && entry.userId === action.payload.userId)
      );
    },
    setEntries: (state, action) => {
      state.loading = false;
      state.error = null;
      state.entries = action.payload;
    }
  }
});

export const selectUserEntries = (state, userId) => 
  state.journal.entries.filter(entry => entry.userId === userId);

export const { 
  setLoading, 
  setError, 
  addEntry, 
  updateEntry, 
  deleteEntry, 
  setEntries 
} = journalSlice.actions;

export default journalSlice.reducer;