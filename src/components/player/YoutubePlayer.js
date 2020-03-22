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

const YoutubePlayer = ({ playerRef }) => {
  return (
    <ReactPlayer
      ref={playerRef}
      url="https://www.youtube.com/watch?v=e1szcpyzsAE"
      {...defaultProps}
    />
  );
};

export function YoutubePlayerProvider({ playerRef, children }) {
  const value = {
    playerRef,
    player: playerRef.current?.getInternalPlayer(),
    togglePlayer: () =>
      playerRef.current.getInternalPlayer().getPlayerState() === 1
        ? playerRef.current.getInternalPlayer().pauseVideo()
        : playerRef.current.getInternalPlayer().playVideo(),
  };
  return (
    <YoutubePlayerContext.Provider value={value}>
      {children}
    </YoutubePlayerContext.Provider>
  );
}

export function useYoutubePlayer() {
  const ctx = React.useContext(YoutubePlayerContext);
  if (!ctx) {
    throw new Error(
      `Please use this hook only in components wrapped in YoutubePlayerProvider`,
    );
  }

  return ctx;
}

export default YoutubePlayer;
