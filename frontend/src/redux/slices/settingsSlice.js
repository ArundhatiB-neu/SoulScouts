// src/redux/slices/settingsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserInStore } from './authSlice'; // Import to update user in auth state

export const updateSettings = createAsyncThunk(
  'settings/updateSettings',
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Sending update settings request with:', {
        formData,
        token: token ? 'Present' : 'Missing'
      });

      const response = await fetch('http://localhost:5001/api/settings/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Settings update failed:', errorData);
        return rejectWithValue(errorData.error);
      }

      const data = await response.json();
      console.log('Settings update successful:', data);
      
      if (data.user) {
        dispatch(updateUserInStore(data.user));
      }
      return data;
    } catch (error) {
      console.error('Settings update error:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  'settings/changePassword',
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Initiating password change request...');

      if (!token) {
        console.error('No token found');
        return rejectWithValue('Authentication token missing');
      }

      const response = await fetch('http://localhost:5001/api/settings/change-password', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Password change failed:', data);
        return rejectWithValue(data.error || 'Failed to change password');
      }

      console.log('Password change successful');
      return data;
    } catch (error) {
      console.error('Password change error:', error);
      return rejectWithValue(error.message || 'An error occurred while changing password');
    }
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    loading: false,
    error: null,
    success: false,
    passwordChangeSuccess: false,
  },
  reducers: {
    clearSettingsStatus: (state) => {
      state.error = null;
      state.success = false;
      state.passwordChangeSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateSettings.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.passwordChangeSuccess = false;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.passwordChangeSuccess = true;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.passwordChangeSuccess = false;
      });
  },
});

export const { clearSettingsStatus } = settingsSlice.actions;
export default settingsSlice.reducer;