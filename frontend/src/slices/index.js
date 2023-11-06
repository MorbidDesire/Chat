import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messageReducer from './messageSlice';

export default configureStore({
  reducer: {
    channelsReducer,
    messageReducer,
  },
});
