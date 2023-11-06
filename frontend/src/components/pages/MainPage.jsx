import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { normalize, schema } from 'normalizr';
import axios from 'axios';
import { setChannels } from '../../slices/channelsSlice';
import { setMessages } from '../../slices/messageSlice';
import { setCurrentChannel } from '../../slices/currentChannelSlice';
import useAuth from '../useAuth';
import Navigation from '../Navigation';
import Channels from './Channels';
import Messages from './Messages';
import routes from '../../routes';
import notify from '../../notify';

const MainPage = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation('translation');

  const getNormalized = (data) => {
    const channel = new schema.Entity('channels');

    const message = new schema.Entity('messages');

    const normalizedChannels = normalize(data.channels, [channel]);
    const normalizedMessages = normalize(data.messages, [message]);
    const normalizedData = { normalizedChannels, normalizedMessages };
    return normalizedData;
  };

  useEffect(() => {
    if (!token) {
      navigate(routes.loginPage, { replace: false });
    } else {
      const fetchData = async () => {
        await axios.get(routes.api.data, {
          timeout: 1000,
          headers: { Authorization: `Bearer ${token}` },
        }).then(({ data }) => {
          const { normalizedChannels, normalizedMessages } = getNormalized(data);
          const { currentChannelId } = data;
          const { channels } = normalizedChannels.entities;
          const currentChannel = Object.values(channels).find(({ id }) => id === currentChannelId);
          const messages = !Object.keys(normalizedMessages.entities).length
            ? {} : normalizedMessages.entities.messages;

          dispatch(setChannels({ entities: channels, ids: Object.keys(channels) }));
          dispatch(setCurrentChannel({ entities: currentChannel, ids: currentChannel.id }));
          dispatch(setMessages({ entities: messages, ids: Object.keys(messages) }));
        }).catch((error) => {
          notify('error', t);
          console.log(error);
          logout();
          navigate(routes.loginPage, { replace: false });
        });
      };
      fetchData();
    }
  });

  return (
    <>
      <Navigation />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </div>
      </div>
    </>
  );
};

export default MainPage;
