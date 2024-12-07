import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for signup
export const signupUser = createAsyncThunk(
  'auth/signup',
  async ({ userData, role }, { rejectWithValue }) => {
    try {
      const endpoints = {
        hr: '/api/register/hr',
        employee: '/api/register/employee',
        coach: '/api/register/coach'
      };
      
      console.log('Attempting employee signup with:', { userData, role }); // Debug log
      
      const response = await fetch(`http://localhost:5001${endpoints[role]}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error || 'Signup failed');
      }

      const data = await response.json();
      console.log('Employee signup response:', data); // Debug log
      
      // Make sure role is explicitly set for employees
      if (role === 'employee' && !data.role) {
        data.role = 'employee';
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.role || role);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error || 'Login failed');
      }

      const data = await response.json();
      // Store token and role from response
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.role); // Use role from backend response
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // If no token exists, just clear everything
        localStorage.clear();
        return { success: true };
      }

      const response = await fetch('http://localhost:5001/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Clear localStorage immediately
      localStorage.clear();

      if (!response.ok) {
        const errorData = await response.json();
        // Even if the server request fails, we want to clear local state
        return { success: true };
      }
      
      return { success: true };
    } catch (error) {
      // Clear localStorage even if request fails
      localStorage.clear();
      // Return success even on error since we want to log out locally
      return { success: true };
    }
  }
);

// const initialState = {
//   user: null,
//   token: localStorage.getItem('token'),
//   role: localStorage.getItem('userRole'),
//   isAuthenticated: !!localStorage.getItem('token'),
//   loading: false,
//   error: null,
//   registrationSuccess: false,
// };

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    role: localStorage.getItem('userRole'),
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
    registrationSuccess: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetRegistrationSuccess: (state) => {
      state.registrationSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup cases
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registrationSuccess = false;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.registrationSuccess = true;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.registrationSuccess = false;
        // Clear any partial auth state on rejection
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.role = null;
      })

      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Clear any partial auth state on rejection
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.role = null;
      })

      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        // Reset everything regardless of server response
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.role = null;
        state.error = null;
        state.registrationSuccess = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        // Reset everything even if server request fails
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.role = null;
        state.error = null;
        state.registrationSuccess = false;
      });
  },
});

export const { clearError, resetRegistrationSuccess } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectUserRole = (state) => state.auth.role;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;