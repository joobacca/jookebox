import React, { useContext, useRef } from 'react';
import SocketProvider from './SocketProvider';
import { UserNameContext } from './UserNameProvider';
import Search from './search/Search';
import YoutubePlayer from './player/YoutubePlayer';
import Controller from './player/Controller';

const Jukebox = () => {
  const [username] = useContext(UserNameContext);
  const playerRef = useRef();
  return (
    <SocketProvider>
      <div>Willkommen, {username}</div>
      <Search />
      <YoutubePlayer referenz={playerRef} />
      <Controller playerRef={playerRef} />
    </SocketProvider>
  );
};

export default Jukebox;
