// src/redux/toggleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

const toggleSlice = createSlice({
  name: 'true',
  initialState,
  reducers: {
    toggleValue: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleValue } = toggleSlice.actions;
export default toggleSlice.reducer;
