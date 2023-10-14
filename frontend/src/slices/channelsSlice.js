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
      const { id } = payload;
      state.entities[id] = payload;
      state.ids.push(id.toString())
    }, 
    renameChannel: (state, { payload }) => {
      const { name, id } = payload;
      state.entities[id].name = name;
    },
    removeChannel: (state, { payload }) => {
      const id = payload.id.toString();
      delete state.entities[id];
      state.ids = state.ids.filter((i) => i !== id)
    }
  },
});

export const { setChannels, addChannel, renameChannel, removeChannel } = channelsSlice.actions;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channelsReducer);
export default channelsSlice.reducer;
