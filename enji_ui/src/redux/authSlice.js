import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'auth',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const actions = slice.actions;
export const reducer = slice.reducer;
