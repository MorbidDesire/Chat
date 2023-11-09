import { io } from 'socket.io-client';
import { SocketContext } from './index';

const SocketProvider = ({ children }) => {
  const socket = io();
  return (
    <SocketContext.Provider value={socket}>
      { children }
    </SocketContext.Provider>
  );
};

export default SocketProvider;
