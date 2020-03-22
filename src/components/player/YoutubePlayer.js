import React from 'react';
import ReactPlayer from 'react-player';
import './player.css';

const defaultProps = {
  playing: false,
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

const YoutubePlayer = ({ referenz }) => {
  return (
    <ReactPlayer
      url="https://www.youtube.com/watch?v=e1szcpyzsAE"
      ref={referenz}
      {...defaultProps}
    />
  );
};

export default YoutubePlayer;
