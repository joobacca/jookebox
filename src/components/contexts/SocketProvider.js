import React, { useContext } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

export const SocketContext = React.createContext();

const SocketProv = React.memo(({ children }) => {
  const socket = io('https://server.jookebox.kim:8081');
  // const socket = io('http://localhost:8081');
  const location = useLocation();
  socket.on('connect', () => {
    socket.emit('joinRoom', location.pathname);
  });
  // comment because build not triggering
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
});

export const useSocket = () => {
  const ctx = useContext(SocketContext);
  if (!ctx)
    throw new Error(
      'Probably not wrapped in SocketContext.Provider, you fool!',
    );
  return ctx;
};

export default SocketProv;
