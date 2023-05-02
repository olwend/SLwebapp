import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import sessionReducer from './slices/sessionSlice';
import labsReducer from './slices/labsSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    session: sessionReducer,
    labs: labsReducer,
  },
});
