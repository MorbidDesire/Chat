import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: {},
  ids: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => {
      const { entities, ids } = payload;
      state.entities = entities;
      state.ids = ids;
    },
    addChannel: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { setChannels, addChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
