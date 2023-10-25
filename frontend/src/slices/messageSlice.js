/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const messageAdapter = createEntityAdapter();

const initialState = messageAdapter.getInitialState();

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      const { entities, ids } = payload;
      state.entities = entities;
      state.ids = ids;
    },
    addMessage: messageAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, { payload }) => {
        const restEntities = Object.values(state.entities)
          .filter((m) => m.channelId !== payload);
        messageAdapter.setAll(state, restEntities);
      });
  },
});

export const { setMessages, addMessage } = messageSlice.actions;
export const messageSelectors = messageAdapter.getSelectors((state) => state.messageReducer);
export default messageSlice.reducer;
