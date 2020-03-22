import React from 'react';
import Youtube from 'react-player';
import './player.css';

const defaultProps = {
  playing: true,
  loop: false,
  controls: false,
  volume: 0.2,
  config: {
    youtube: {
      disablekb: 1,
      showinfo: 0,
      enablejsapi: 1,
    },
  },
};

const Player = ({ referenz }) => {
  return (
    <Youtube
      url="https://www.youtube.com/watch?v=e1szcpyzsAE"
      ref={referenz}
      {...defaultProps}
    />
  );
};

export default Player;
