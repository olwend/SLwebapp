import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {
      isAuthenticated: false,
      isLoaded: false
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    setIsLoaded: (state, action) => {
      state.value.isLoaded = action.payload
    },
  },
});

export const { setUser } = userSlice.actions;

export const { setIsLoaded } = userSlice.actions;

export const getUser = state => state.user.value;

export default userSlice.reducer;
