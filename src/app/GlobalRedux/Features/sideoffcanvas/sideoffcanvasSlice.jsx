'use client';
import { createSlice } from '@reduxjs/toolkit';

const sideoffcanvasSlice = createSlice({
  name: 'sideoffcanvas',
  initialState: {
    isVisible: false,
  },
  reducers: {
    showsideoffCanvas: (state) => {
      state.isVisible = !state.isVisible;;
    },
    hidesideoffCanvas: (state) => {
      state.isVisible = false;
    },
  },
});

export const { showsideoffCanvas, hidesideoffCanvas } = sideoffcanvasSlice.actions;
export default sideoffcanvasSlice.reducer;
