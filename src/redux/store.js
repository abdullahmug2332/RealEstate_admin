// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import toggleReducer from './toggleSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    toggle: toggleReducer,
  },
});
