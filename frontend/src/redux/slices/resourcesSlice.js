import { createSlice } from '@reduxjs/toolkit';

export const resourcesSlice = createSlice({
  name: 'resources',
  initialState: {
    list: [],
    categories: [
      { value: 'mindfulness', label: 'Mindfulness' },
      { value: 'relaxation', label: 'Relaxation' },
      { value: 'meditation', label: 'Meditation' },
      { value: 'focus', label: 'Focus Music' },
      { value: 'asmr', label: 'ASMR' },
      { value: 'rain', label: 'Rain Sounds' },
      { value: 'activities', label: 'Destress Activities' }
    ],
    loading: false,
    error: null
  },
  reducers: {
    addResource: (state, action) => {
      state.list.push(action.payload);
    },
    updateResource: (state, action) => {
      const index = state.list.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteResource: (state, action) => {
      state.list = state.list.filter(r => r.id !== action.payload);
    },
    setResources: (state, action) => {
      state.list = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    }
  }
});

export const { addResource, updateResource, deleteResource, setResources, addCategory } = resourcesSlice.actions;
export default resourcesSlice.reducer;