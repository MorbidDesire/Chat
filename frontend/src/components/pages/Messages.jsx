/* eslint-disable max-len */
import { useTranslation } from 'react-i18next';
import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import useAuth from '../useAuth';
import { socket } from '../../socket';
import { currentChannelSelectors } from '../../slices/currentChannelSlice';
import { channelsSelectors } from '../../slices/channelsSlice';
import filter from '../../clean';
import notify from '../../notify';
import { messageSelectors } from '../../slices/messageSlice';

const MessageBox = ({ channelMessages }) => {
  const messages = useRef(null);
  useEffect(() => {
    messages.current.scrollTo(0, messages.current.scrollHeight);
  }, [channelMessages]);
  return (
    <div id="messages-box" ref={messages} className="chat-messages overflow-auto px-5 ">
      {channelMessages.map(({ author, text, id }) => (
        <div key={id} className="text-break mb-2">
          <b>{author}</b>
          :
          {' '}
          {filter(text)}
        </div>
      ))}
    </div>
  );
};

const MessageForm = ({ currentChannel, t }) => {
  const [text, setText] = useState('');
  const { username } = useAuth();
  const inputEl = useRef(null);
  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  }, [currentChannel]);

  const handleChange = ({ target }) => {
    setText(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    inputEl.current.setAttribute('disabled', true);
    const post = {
      text,
      author: username,
      channelId: currentChannel.id,
      id: _.uniqueId(),
    };
    socket.timeout(5000).emit('newMessage', post, (err) => {
      inputEl.current.setAttribute('disabled', true);
      if (err) {
        notify('add', 'error', t);
        console.log(err);
      }
      inputEl.current.removeAttribute('disabled');
      inputEl.current.focus();
    });
    setText('');
  };

  return (
    <div className="mt-auto px-5 py-3">
      <form noValidate className="py-1 border rounded-2" onSubmit={handleSubmit}>
        <div className="input-group has-validation">
          <input name="body" ref={inputEl} aria-label={t('mainPage.messages.new')} placeholder={t('mainPage.messages.placeholder')} className="border-0 p-0 ps-2 form-control" value={text} onChange={handleChange} />
          <button type="submit" disabled={text.trim() === ''} className="btn btn-group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="visually-hidden">{t('mainPage.messages.send')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

const Messages = () => {
  const { t } = useTranslation('translation');
  const currentChannel = useSelector(currentChannelSelectors.selectEntities);
  const currentChannelId = useSelector(currentChannelSelectors.selectIds);
  const channels = useSelector(channelsSelectors.selectEntities);
  const messages = useSelector(messageSelectors.selectAll);
  const channelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
  const count = channelMessages.length;

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          {!_.isEmpty(channels) && (
          <p className="m-0">
            <b>
              #
              {filter(channels[currentChannelId].name)}
            </b>
          </p>
          )}
          <span className="text-muted">{t('mainPage.messages.counter.count', { count })}</span>
        </div>
        {!_.isEmpty(channelMessages) && <MessageBox channelMessages={channelMessages} />}
        <MessageForm currentChannel={currentChannel} t={t} />
      </div>
    </div>
  );
};

export default Messages;
