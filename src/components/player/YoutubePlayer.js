import React from 'react';
import ReactPlayer from 'react-player';
import { useAppState } from '../contexts/AppStateProvider';

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
  const {
    video: { current },
  } = useAppState();
  return (
    <ReactPlayer
      url={`https://www.youtube.com/watch?v=${current}`}
      ref={referenz}
      sameSite="none"
      secure="true"
      {...defaultProps}
    />
  );
};

export default YoutubePlayer;
