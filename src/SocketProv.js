import React from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

export const SocketContext = React.createContext();

const SocketProv = ({ children }) => {
  const socket = io("http://localhost:5000");
  const location = useLocation();
  socket.on("connect", () => {
    socket.emit("joinRoom", location.pathname);
  });
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProv;

