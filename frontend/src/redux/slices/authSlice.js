import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    role: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
    },
    updateUserSettings: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    }
  }
});

export default authSlice;