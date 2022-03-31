import { configureStore } from '@reduxjs/toolkit';
import { reducer as authReducer } from './authSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
