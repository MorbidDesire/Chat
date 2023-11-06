/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const currentChannelAdapter = createEntityAdapter();

const initialState = currentChannelAdapter.getInitialState();

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState,
  reducers: {
    setCurrentChannel: (state, { payload }) => {
      console.log('SET');
      const { entities, ids } = payload;
      state.entities = entities;
      state.ids = ids;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, { payload }) => {
        if (state.ids === payload) {
          const defaultChannel = { name: 'general', id: 1, removable: false };
          state.entities = defaultChannel;
          state.ids = defaultChannel.id;
        }
      });
  },
});

export const { setCurrentChannel, changeCurrentChannel } = currentChannelSlice.actions;
export const currentChannelSelectors = currentChannelAdapter.getSelectors((state) => state.currentChannelReducer);
export default currentChannelSlice.reducer;
