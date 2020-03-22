import React, { useRef, useEffect, useState, useContext } from 'react';
import Player from './Player';
import { Button } from '@material-ui/core';
import { SocketContext } from '../SocketProvider';

const Controller = ({ playerRef }) => {
  const [playbackState, setPlayback] = useState(true);
  const socket = useContext(SocketContext);
  const controllerRef = useRef();
  useEffect(() => {
    controllerRef.current = playerRef.current.getInternalPlayer();
    socket.on('playVideo', id => console.log(id));
  });
  const onClickHandler = () => {
    console.log(controllerRef.current);
  };
  const toggleVideo = () =>
    playbackState
      ? controllerRef.current.pauseVideo()
      : controllerRef.current.playVideo();
  return (
    <div>
      <Button onClick={() => onClickHandler()}>Test</Button>
    </div>
  );
};

export default Controller;
