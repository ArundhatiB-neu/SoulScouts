import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const signupHR = createAsyncThunk(
//   'auth/signupHR',
//   async (userData) => {
//     const response = await axios.post('/api/signup/hr', userData);
//     return response.data;
//   }
// );

// export const signupEmployee = createAsyncThunk(
//   'auth/signupEmployee',
//   async (userData) => {
//     const response = await axios.post('/api/signup/employee', userData);
//     return response.data;
//   }
// );

// export const signupCoach = createAsyncThunk(
//   'auth/signupCoach',
//   async (userData) => {
//     const response = await axios.post('/api/signup/coach', userData);
//     return response.data;
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     role: null,
//     isAuthenticated: false,
//     loading: false,
//     error: null
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.role = null;
//       state.isAuthenticated = false;
//     },
//     updateUserSettings: (state, action) => {
//       state.user = { ...state.user, ...action.payload };
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // HR Signup
//       .addCase(signupHR.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signupHR.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.role = 'hr';
//         state.isAuthenticated = true;
//       })
//       .addCase(signupHR.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       // Employee Signup
//       .addCase(signupEmployee.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signupEmployee.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.role = 'employee';
//         state.isAuthenticated = true;
//       })
//       .addCase(signupEmployee.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       // Coach Signup
//       .addCase(signupCoach.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signupCoach.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.role = 'coach';
//         state.isAuthenticated = true;
//       })
//       .addCase(signupCoach.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//   }
// });

// export const { logout, updateUserSettings } = authSlice.actions;
// export default authSlice.reducer;

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
    signupSuccess: (state, action) => {
      state.user = action.payload;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      state.loading = false;
    }
  }
});

export const { signupSuccess } = authSlice.actions;
export default authSlice.reducer;