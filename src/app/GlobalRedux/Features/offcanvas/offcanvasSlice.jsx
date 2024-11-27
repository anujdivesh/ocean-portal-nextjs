'use client';
import { createSlice } from '@reduxjs/toolkit';

const offcanvasSlice = createSlice({
  name: 'offcanvas',
  initialState: {
    isVisible: false,
  },
  reducers: {
    showoffCanvas: (state) => {
      state.isVisible = !state.isVisible;;
    },
    hideoffCanvas: (state) => {
      state.isVisible = false;
    },
  },
});

export const { showoffCanvas, hideoffCanvas } = offcanvasSlice.actions;
export default offcanvasSlice.reducer;
