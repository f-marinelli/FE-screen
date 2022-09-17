import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import messageSlice from './messageSlice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    message: messageSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
