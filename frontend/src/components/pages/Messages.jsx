import { useTranslation } from 'react-i18next';
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import cn from 'classnames';
import useAuth from '../useAuth';
import { socket } from '../../socket';
import { channelsSelectors } from '../../slices/channelsSlice';
import notify from '../../notify';
import { messageSelectors } from '../../slices/messageSlice';
import FilterContext from '../../FilterContext';
import messageBtn from '../../assets/msgBtn.svg';

const MessageBox = ({ channelMessages }) => {
  const dictionary = useContext(FilterContext);
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
          {dictionary.clean(text)}
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
      if (err) {
        notify('add', 'error', t);
        console.log(err);
      }
      inputEl.current.removeAttribute('disabled');
      inputEl.current.focus();
    });
    setText('');
  };

  const inputClass = cn('border-0', 'p-0', 'ps-2', 'form-control');

  return (
    <div className="mt-auto px-5 py-3">
      <form noValidate className="py-1 border rounded-2" onSubmit={handleSubmit}>
        <div className="input-group has-validation">
          <input name="body" ref={inputEl} aria-label={t('mainPage.messages.new')} placeholder={t('mainPage.messages.placeholder')} className={inputClass} value={text} onChange={handleChange} />
          <button type="submit" disabled={text.trim() === ''} className="btn btn-group-vertical">
            <img src={messageBtn} alt={t('mainPage.messages.send')} />
            <span className="visually-hidden">{t('mainPage.messages.send')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

const Messages = () => {
  const dictionary = useContext(FilterContext);
  const { t } = useTranslation('translation');
  const channels = useSelector(channelsSelectors.selectEntities);
  const messages = useSelector(messageSelectors.selectAll);
  const { currentChannel } = channels;
  const channelMessages = messages.filter(({ channelId }) => channelId === currentChannel.id);
  const count = channelMessages.length;

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          {!_.isEmpty(channels) && (
          <p className="m-0">
            <b>
              #
              {dictionary.clean(currentChannel.name)}
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
