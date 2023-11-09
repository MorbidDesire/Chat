import { Dropdown, Button } from 'react-bootstrap';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { setCurrentChannel } from '../../slices/channelsSlice.js';
import { FilterContext } from '../../context/index.js';

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
    dispatch(setCurrentChannel(id));
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

export default Channel;
