import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

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
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, { payload }) => {
        const { id } = payload;
        const newMessages = Object.entries(state.entities).filter(([, value]) => value.channelId !== id);
        state.entities = Object.fromEntries(newMessages);
        state.ids = Object.keys(state.entities);
      });
  },
});

export const { setMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
