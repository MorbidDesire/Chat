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
      console.log('ADD');
      state.entities[payload.id] = payload;
      state.ids.push(payload.id);
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
