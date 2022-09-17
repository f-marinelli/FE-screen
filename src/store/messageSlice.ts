import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface MessageState {
  value: string;
}

const initialState: MessageState = {
  value: '',
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    resetMessage(state) {
      state.value = '';
    },
  },
});

export const { setMessage, resetMessage } = messageSlice.actions;

export default messageSlice;
