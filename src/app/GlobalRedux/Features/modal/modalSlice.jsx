'use client';
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isVisible: false,
  },
  reducers: {
    showModaler: (state) => {
      state.isVisible = true;
    },
    hideModal: (state) => {
      state.isVisible = false;
    },
  },
});

export const { showModaler, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
