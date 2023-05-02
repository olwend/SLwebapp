import { createSlice } from '@reduxjs/toolkit';

const labsSlice = createSlice({
  name: 'labs',
  initialState: {
    data: [],
    isLoaded: false
  },
  reducers: {
    setLabs: (state, action) => {
      state.data = action.payload;
    },
    setIsLoaded: (state, action) => {
      state.isLoaded = action.payload
    },
  },
});

export const { setLabs } = labsSlice.actions;

export const { setIsLoaded } = labsSlice.actions;

export const getLabs = state => state.labs;

export default labsSlice.reducer;