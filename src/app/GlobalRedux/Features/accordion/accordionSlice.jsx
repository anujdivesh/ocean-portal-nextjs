'use client';
import { createSlice } from '@reduxjs/toolkit'

export const accordionSlice = createSlice({
  name: 'accordion',
  initialState: {
    value: '',
  },
  reducers: {
    setAccordion: (state, action) => {
      state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAccordion } = accordionSlice.actions

export default accordionSlice.reducer