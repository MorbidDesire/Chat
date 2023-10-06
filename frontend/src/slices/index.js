import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messageReducer from './messageSlice';
import currentChannelReducer from './currentChannelSlice';

export default configureStore({
  reducer: {
    // Свойство channels будет внутри объекта общего состояния: state.channels
    currentChannelReducer,
    channelsReducer,
    messageReducer,
  },
});
