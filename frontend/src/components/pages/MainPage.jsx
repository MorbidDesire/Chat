/* eslint-disable */
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { normalize, schema } from 'normalizr';
import { setChannels, addChannel } from '../../slices/channelsSlice';
import { setMessages, addMessage } from '../../slices/messageSlice';
import { setCurrentChannel } from '../../slices/currentChannelSlice';
import { useAuth } from "../useAuth";
import Channels from './Channels';
import Messages from './Messages';
import axios from 'axios';

const MainPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const dispatch = useDispatch();

  const getNormalized = (data) => {
    const channel = new schema.Entity('channels');

    const message = new schema.Entity('messages', {
      channel
    });

    const normalizedChannels = normalize(data.channels, [channel]);
    const normalizedMessages = normalize(data.messages, [message]);
    const normalizedData = {normalizedChannels, normalizedMessages};
    return normalizedData;
  };

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: false })
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
    const instance = axios.create({
      timeout: 1000,
      headers: {'Authorization': 'Bearer '+token}
    });
    const { data } = await instance.get('/api/v1/data');
    const { normalizedChannels, normalizedMessages } = getNormalized(data);
    const { currentChannelId } = data;
    const { channels } = normalizedChannels.entities;
    const currentChannel = Object.values(channels).find(({id}) => id === currentChannelId);
    // const user = state.users.find(({ id }) => id === req.user.userId);

    // const entries = Object.entries(channels).map(([, value]) => {
    //   value.active = value.id === currentChannelId;
    //   return value;
    // });
    // const sortedChannels = {...entries};
    const { messages }  = normalizedMessages.entities;
  
    dispatch(setChannels({ entities: channels, ids: Object.keys(channels) }));
    dispatch(setCurrentChannel({ entities: currentChannel, id: currentChannel.id  }))
    // dispatch(setMessages({ entities: messages, ids: Object.keys(messages) }));
    }
    fetchData();  
  }, []);

  if (token) {
    return (
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels/>
          <Messages/>
        </div>
      </div>
    );
  };
};

export default MainPage;
