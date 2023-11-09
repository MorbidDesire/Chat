import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { channelsSelectors } from '../../slices/channelsSlice';
import { messageSelectors } from '../../slices/messageSlice';
import { FilterContext } from '../../context/index.js';
import MessageBox from './MessageBox';
import MessageForm from './MessageForm';

const Messages = () => {
  const dictionary = useContext(FilterContext);
  const { t } = useTranslation('translation');
  const channels = useSelector(channelsSelectors.selectEntities);
  const messages = useSelector(messageSelectors.selectAll);
  const { currentChannelId } = channels;
  const currentCh = useSelector((state) => channelsSelectors.selectById(state, currentChannelId));
  const channelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
  const count = channelMessages.length;

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          {currentCh && (
          <p className="m-0">
            <b>
              #
              {dictionary.clean(currentCh.name)}
            </b>
          </p>
          )}
          <span className="text-muted">{t('mainPage.messages.counter.count', { count })}</span>
        </div>
        <MessageBox channelMessages={channelMessages} />
        <MessageForm currentChannelId={currentChannelId} t={t} />
      </div>
    </div>
  );
};

export default Messages;
