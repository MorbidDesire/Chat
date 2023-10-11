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
    changeCurrentChannel: (state, { payload }) => {
      state.entities = payload;
      state.id = payload.id;
    },
  },
});

export const { setCurrentChannel, changeCurrentChannel } = currentChannelSlice.actions;
export default currentChannelSlice.reducer;
