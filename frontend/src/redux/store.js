import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import resourcesReducer from './slices/resourcesSlice';
import companyReducer from './slices/companySlice';
import coachReducer from './slices/coachSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    resources: resourcesReducer,
    companies: companyReducer,
    coaches: coachReducer
  }
});

export * from './slices/resourcesSlice';
export default store;