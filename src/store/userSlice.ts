import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface User {
  value: {
    username?: string;
    password?: string;
    email?: string;
    accessToken?: string;
    APIKey?: string;
  };
}

// interface EmptyObject {
//   value: Record<any, never>;
// }

const initialState: User = {
  value: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state: User, action: PayloadAction<User>) {
      // @ts-ignore
      state.value = action.payload;
    },
    logout(state) {
      state.value = {};
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice;
