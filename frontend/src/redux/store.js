import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import resourcesReducer from './slices/resourcesSlice';
import companyReducer from './slices/companySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    resources: resourcesReducer,
    companies: companyReducer
  }
});

export * from './slices/resourcesSlice';
export default store;