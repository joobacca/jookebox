import React from 'react';
import ReactPlayer from 'react-player';
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

const YoutubePlayerContext = React.createContext();

const YoutubePlayer = ({ children }) => {
  const ref = React.useRef();
  const value = {
    ref,
    player: ref.current?.getInternalPlayer(),
    togglePlayer: () =>
      ref.current.getInternalPlayer().getPlayerState() === 1
        ? ref.current.getInternalPlayer().pauseVideo()
        : ref.current.getInternalPlayer().playVideo(),
  };
  return (
    <>
      <ReactPlayer
        ref={ref}
        url="https://www.youtube.com/watch?v=e1szcpyzsAE"
        {...defaultProps}
      />
      <YoutubePlayerContext.Provider value={value}>
        {children}
      </YoutubePlayerContext.Provider>
    </>
  );
};

export function useYoutubePlayer() {
  const ctx = React.useContext(YoutubePlayerContext);
  if (!ctx) {
    throw new Error(`Please use this hook only in components wrapped in YoutubePlayer`);
  }

  return ctx;
}

export default YoutubePlayer;
