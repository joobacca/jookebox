import React, { useState, useContext } from 'react';

const AppStateContext = React.createContext();

const AppStateProvider = ({ children }) => {
  const [playing, setPlaying] = useState({ videoId: 'e1szcpyzsAE' });
  const [playState, setPlayState] = useState(false);
  const [playedAt, setPlayedAt] = useState(0);
  const [volume, setVolume] = useState(50);
  const [playList, setPlayList] = useState([]);
  return (
    <AppStateContext.Provider
      value={{
        video: { current: playing, set: setPlaying },
        playBackState: { current: playState, set: setPlayState },
        volume: { current: volume, set: setVolume },
        playedAt: { current: playedAt, set: setPlayedAt },
        playList: { current: playList, set: setPlayList },
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const state = useContext(AppStateContext);
  if (!state) throw new Error('Wrap in AppStateProvider first, you noob!');
  return state;
};

export default AppStateProvider;
