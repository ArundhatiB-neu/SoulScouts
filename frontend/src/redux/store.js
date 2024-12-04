import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import resourcesReducer from './slices/resourcesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    resources: resourcesReducer
  }
});

export * from './slices/resourcesSlice';
export default store;