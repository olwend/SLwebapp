import { createSlice } from '@reduxjs/toolkit'

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    value: {
      session: {},
      isLabActive: false,
      isLabRunning: false,
      isLoaded: false,
      remainingMins: 0,
      readme: "",
      currentSlide: 1,
    },
  },
  reducers: {
    setReduxSession: (state, action) => {
      state.value = action.payload;
    },
    setIsLabRunning: (state, action) => {
      state.value.isLabRunning = action.payload
    },
    setIsLoaded: (state, action) => {
      state.value.isLoaded = action.payload
    },
    setReadme: (state, action) => {
      state.value.readme = action.payload
    },
    setRemainingMins: (state, action) => {
      state.value.remainingMins = action.payload
    },
    setIsALBRunning: (state, action) => {
      state.value.isALBRunning = action.payload
    },
    setCurrentSlide: (state, action) => {
      state.value.currentSlide = action.payload
    }
  },
});

export const { setReduxSession } = sessionSlice.actions;

export const { setIsLabRunning } = sessionSlice.actions;

export const { setRemainingMins } = sessionSlice.actions;

export const { setIsLoaded } = sessionSlice.actions;

export const { setReadme } = sessionSlice.actions;

export const { setIsALBRunning } = sessionSlice.actions;

export const { setCurrentSlide } = sessionSlice.actions;

export const getSession = state => state.session.value;

export default sessionSlice.reducer;