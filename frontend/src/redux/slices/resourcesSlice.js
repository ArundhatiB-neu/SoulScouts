import { createSlice } from '@reduxjs/toolkit';

export const resourcesSlice = createSlice({
  name: 'resources',
  initialState: {
    list: [
      {
        id: "res001",
        title: "10-Minute Mindful Breathing Exercise",
        link: "https://www.youtube.com/watch?v=6p_yaNFSYao",
        description: "A guided breathing exercise perfect for beginners. This session helps reduce anxiety and improve focus through simple mindfulness techniques.",
        category: "mindfulness"
      },
      {
        id: "res002",
        title: "Progressive Muscle Relaxation Guide",
        link: "https://www.youtube.com/watch?v=86HUcX8ZtAk",
        description: "Learn how to systematically relax your entire body through progressive muscle relaxation. Great for stress relief and better sleep.",
        category: "relaxation"
      },
      {
        id: "res003",
        title: "Zen Garden Meditation",
        link: "https://www.youtube.com/watch?v=H8qgjyqibwY",
        description: "A peaceful 20-minute meditation session set in a serene Japanese garden. Perfect for afternoon breaks or morning routines.",
        category: "meditation"
      },
      {
        id: "res004",
        title: "Deep Focus Study Music",
        link: "https://www.youtube.com/watch?v=lTRiuFIWV54",
        description: "3 hours of calming instrumental music designed to enhance concentration and productivity. Ideal for work or study sessions.",
        category: "focus"
      },
      {
        id: "res005",
        title: "Calming Wood Sounds ASMR",
        link: "https://www.youtube.com/watch?v=NSVwmtz5A68",
        description: "Relaxing wood carving sounds with no talking. Perfect for relaxation and stress relief during work breaks.",
        category: "asmr"
      },
      {
        id: "res006",
        title: "Thunderstorm for Sleep",
        link: "https://www.youtube.com/watch?v=yMRoNNKWuqQ",
        description: "8 hours of gentle rain and distant thunder sounds. Create the perfect atmosphere for deep, restful sleep.",
        category: "rain"
      },
      {
        id: "res007",
        title: "5-Minute Desk Stretching Routine",
        link: "https://www.youtube.com/watch?v=kdLSJuzRNUw",
        description: "Quick and effective stretching exercises you can do at your desk to relieve tension and improve circulation.",
        category: "activities"
      },
      {
        id: "res008",
        title: "Morning Mindfulness Routine",
        link: "https://www.youtube.com/watch?v=QHkXvPq2pQE",
        description: "Start your day with this 15-minute mindfulness practice. Includes gentle movement and breathing exercises.",
        category: "mindfulness"
      },
      {
        id: "res009",
        title: "Nature Sounds Meditation",
        link: "https://www.youtube.com/watch?v=eKFTSSKCzWA",
        description: "A guided meditation accompanied by soothing nature sounds. Perfect for reducing stress and increasing mindful awareness.",
        category: "meditation"
      },
      {
        id: "res010",
        title: "Ocean Waves ASMR",
        link: "https://www.youtube.com/watch?v=Nep1qytq9JM",
        description: "Gentle ocean waves crashing on the shore. A natural white noise perfect for relaxation or background sound while working.",
        category: "asmr"
      }
    ],
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