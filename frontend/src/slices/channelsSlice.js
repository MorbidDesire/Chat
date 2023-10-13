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
  },
});

export const { setChannels, addChannel } = channelsSlice.actions;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channelsReducer);
export default channelsSlice.reducer;
