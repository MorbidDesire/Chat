/* eslint-disable no-param-reassign */
/* eslint-disable */
import { createSlice, createEntityAdapter, current } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => {
      const { entities, ids } = payload;
      state.entities = entities;
      state.ids = ids;
    },
    addChannel: (state, { payload }) => {
      const { channel } = payload;
      state.entities[channel.id] = channel;
      state.ids.push(channel.id.toString())
    },
    renameChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
  },
});

export const {
  setChannels,
  addChannel,
  renameChannel,
  removeChannel,
} = channelsSlice.actions;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channelsReducer);
export default channelsSlice.reducer;
