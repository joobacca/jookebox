import React, { useContext } from 'react';
import SocketProvider from './SocketProvider';
import { UserNameContext } from './UserNameProvider';
import Search from './search/Search';
import YoutubePlayer from './player/YoutubePlayer';
// import Controller from './player/Controller';
import TogglePlaybackButton from './TogglePlaybackButton'

const Jukebox = () => {
  const [username] = useContext(UserNameContext);
  return (
    <SocketProvider>
      <div>Willkommen, {username}</div>
      <Search />
      <YoutubePlayer>
        <TogglePlaybackButton />
      </YoutubePlayer>
      {/* <Controller playerRef={playerRef} /> */}
    </SocketProvider>
  );
};

export default Jukebox;
