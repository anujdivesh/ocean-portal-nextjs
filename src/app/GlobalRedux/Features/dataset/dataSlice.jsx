'use client';
import { createSlice } from '@reduxjs/toolkit'

export const datasetSlice = createSlice({
  name: 'dataset',
  initialState: {
    value: [],
  },
  reducers: {
    setDataset: (state, action) => {
      state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDataset } = datasetSlice.actions

export default datasetSlice.reducer