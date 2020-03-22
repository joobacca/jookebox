import React, { useEffect, useContext } from 'react';
import { Button } from '@material-ui/core';
import { SocketContext } from '../SocketProvider';

const Controller = ({ playerRef }) => {
  const socket = useContext(SocketContext);
  
  useEffect(() => {
    socket.on('playVideo', id => console.log(id));
  }, [socket]);

  const toggleVideo = () =>
    playerRef.current.getInternalPlayer().getPlayerState() === 1
      ? playerRef.current.getInternalPlayer().pauseVideo()
      : playerRef.current.getInternalPlayer().playVideo();

  return (
    <div>
      <Button onClick={toggleVideo}>Test</Button>
    </div>
  );
};

export default Controller;
