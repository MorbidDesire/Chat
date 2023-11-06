/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

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
      state.entities[payload.id] = payload;
      state.ids.push(payload.id);
    },
    renameChannel: (state, { payload }) => {
      channelsAdapter.updateOne(state, payload);
      const { id, changes } = payload;
      const { currentChannel } = state.entities;
      if (currentChannel.id === id) {
        state.entities.currentChannel.name = changes.name;
      }
    },
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);
      const { currentChannel } = state.entities;
      const defaultChannel = { name: 'general', id: 1, removable: false };
      if (currentChannel.id === payload) {
        state.entities.currentChannel = defaultChannel;
      }
    },
    setCurrentChannel: (state, { payload }) => {
      state.entities.currentChannel = payload;
    },
  },
});

export const {
  setChannels,
  addChannel,
  renameChannel,
  removeChannel,
  setCurrentChannel,
} = channelsSlice.actions;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channelsReducer);
export default channelsSlice.reducer;
