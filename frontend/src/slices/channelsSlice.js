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
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);
      const { defaultChannelId, currentChannelId } = state.entities;
      if (currentChannelId === payload) {
        state.entities.currentChannelId = defaultChannelId;
      }
    },
    setCurrentChannel: (state, { payload }) => {
      if (payload.defaultChannelId) {
        const { id, defaultChannelId } = payload;
        state.entities.currentChannelId = id;
        state.entities.defaultChannelId = defaultChannelId;
      } else {
        state.entities.currentChannelId = payload;
      }
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
