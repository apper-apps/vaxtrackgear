import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    settings: settingsReducer,
  },
});