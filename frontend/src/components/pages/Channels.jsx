/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from 'react-i18next';
import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import _ from 'lodash';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannel, channelsSelectors } from '../../slices/channelsSlice.js';
import NewChannelModal from '../modals/NewChModal';
import RenameChannelModal from '../modals/RenameChModal';
import RemoveChannelModal from '../modals/RemoveChModal';
import FilterContext from '../../filterContext';
import chnlBtn from '../../assets/chnlBtn.svg';

const Channel = ({
  channel,
  t,
  setModalChannel,
  setModalRemove,
  setModalRename,
  currentChannelId,
}) => {
  const dispatch = useDispatch();
  const dictionary = useContext(FilterContext);
  const { id, name, removable } = channel;

  const handleChangeChannel = () => {
    dispatch(setCurrentChannel(channel));
  };
  const btnClass = cn('w-100', 'rounded-0', 'text-start', 'text-truncate', 'btn', {
    'btn-secondary': id === currentChannelId,
  });
  const dropdownClass = cn('flex-grow-0', {
    'btn-secondary': id === currentChannelId,
  });
  if (!removable) {
    return (
      <li key={id} className="nav-item w-100">
        <button type="button" onClick={handleChangeChannel} className={btnClass}>
          <span className="me-1">#</span>
          {name}
        </button>
      </li>
    );
  }
  return (
    <li key={id} className="nav-item w-100">
      <Dropdown role="group" className="d-flex btn-group">
        <button type="button" onClick={handleChangeChannel} className={btnClass}>
          <span className="me-1">#</span>
          {dictionary.clean(name)}
        </button>
        <Dropdown.Toggle variant="none" split id="dropdown-basic" aria-expanded="false" className={dropdownClass}>
          <span className="visually-hidden">{t('mainPage.channels.manageCh')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Button className="dropdown-item" onClick={() => { setModalChannel(channel); setModalRemove(true); }}>{t('mainPage.channels.delete')}</Button>
          <Button className="dropdown-item" onClick={() => { setModalChannel(channel); setModalRename(true); }}>{t('mainPage.channels.rename')}</Button>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

const Channels = () => {
  const [modalChannel, setModalChannel] = useState('');
  const [modalNewCh, setModalNew] = useState(false);
  const [modalRenameCh, setModalRename] = useState(false);
  const [modalRemoveCh, setModalRemove] = useState(false);
  const { t } = useTranslation('translation');
  const channels = useSelector(channelsSelectors.selectAll);
  const { currentChannel } = useSelector(channelsSelectors.selectEntities);
  const channelsBox = useRef(null);
  const lastChannelId = Number(_.last(useSelector(channelsSelectors.selectIds)));
  const defaultChannelId = Number(_.head(useSelector(channelsSelectors.selectIds)));

  useEffect(() => {
    if (channelsBox.current.scrollHeight !== channelsBox.current.offsetHeight) {
      if (currentChannel.id === defaultChannelId) {
        channelsBox.current.scrollTo(0, 0);
      }
      if (currentChannel.id === lastChannelId) {
        channelsBox.current.scrollTo(0, channelsBox.current.scrollHeight);
      }
    }
  }, [currentChannel, lastChannelId]);

  const channelNames = channels.map(({ name }) => name);
  const ulClass = cn('nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block');

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('mainPage.channels.header')}</b>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => setModalNew(true)}>
          <img src={chnlBtn} alt={t('mainPage.channels.add')} />
          <span className="visually-hidden">+</span>
        </button>
        <NewChannelModal
          show={modalNewCh}
          onHide={() => setModalNew(false)}
          channelnames={channelNames}
        />
        {modalChannel && (
        <RenameChannelModal
          show={modalRenameCh}
          onHide={() => { setModalRename(false); setModalChannel(''); }}
          channelnames={channelNames}
          channel={modalChannel}
        />
        )}
        {modalRemoveCh && (
        <RemoveChannelModal
          show={modalRemoveCh}
          onHide={() => { setModalRemove(false); setModalChannel(''); }}
          channelnames={channelNames}
          channel={modalChannel}
        />
        )}
      </div>
      <ul id="channels-box" ref={channelsBox} className={ulClass}>
        {channels.map((channel) => (
          <Channel
            channel={channel}
            currentChannelId={currentChannel.id}
            key={channel.id}
            t={t}
            setModalChannel={setModalChannel}
            setModalRemove={setModalRemove}
            setModalRename={setModalRename}
          />
        ))}
      </ul>
    </div>
  );
};

export default Channels;
