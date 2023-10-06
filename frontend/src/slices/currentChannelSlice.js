import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: {},
  id: '',
};

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState,
  reducers: {
    setCurrentChannel: (state, { payload }) => {
      const { entities, id } = payload;
      state.entities = entities;
      state.id = id;
    },
  },
});

export const { setCurrentChannel } = currentChannelSlice.actions;
export default currentChannelSlice.reducer;
