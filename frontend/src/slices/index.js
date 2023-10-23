import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messageReducer from './messageSlice';
import currentChannelReducer from './currentChannelSlice';

export default configureStore({
  reducer: {
    currentChannelReducer,
    channelsReducer,
    messageReducer,
  },
});
