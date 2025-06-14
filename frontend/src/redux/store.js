import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import resourcesReducer from './slices/resourcesSlice';
import companyReducer from './slices/companySlice';
import coachReducer from './slices/coachSlice';
import employeeReducer from './slices/employeeSlice';
import journalReducer from './slices/journalSlice';
import settingsReducer from './slices/settingsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    resources: resourcesReducer,
    companies: companyReducer,
    coaches: coachReducer,
    employees: employeeReducer,
    journal: journalReducer,
    settings: settingsReducer,
  }
});

export * from './slices/resourcesSlice';
export default store;