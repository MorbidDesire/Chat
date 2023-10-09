/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: {},
  ids: [],
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      const { entities, ids } = payload;
      state.entities = entities;
      state.ids = ids;
    },
    addMessage: (state, { payload }) => {
      const { id } = payload;
      state.entities[id] = payload;
      state.ids.push(id.toString());
    },
  },
});

export const { setMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
