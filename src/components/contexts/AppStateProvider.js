import React, { useState, useContext } from 'react';

const AppStateContext = React.createContext();

const AppStateProvider = ({ children }) => {
  const [playing, setPlaying] = useState({});
  const [playState, setPlayState] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const [playList, setPlayList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  return (
    <AppStateContext.Provider
      value={{
        video: { current: playing, set: setPlaying },
        volume: { current: volume, set: setVolume },
        progress: { current: progress, set: setProgress },
        playList: { current: playList, set: setPlayList },
        playBackState: { current: playState, set: setPlayState },
        search: { current: searchResult, set: setSearchResult },
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
