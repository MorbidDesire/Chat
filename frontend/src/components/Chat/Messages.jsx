import { useTranslation } from 'react-i18next';
import React, {
  useContext,
} from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
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
