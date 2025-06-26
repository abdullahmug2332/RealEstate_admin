// src/redux/toggleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: true,
};

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleValue: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleValue } = toggleSlice.actions;
export default toggleSlice.reducer;
