import React, { useRef } from 'react';
import SocketProvider from './contexts/SocketProvider';
import { useUserName } from './contexts/UserNameProvider';
import Search from './search/Search';
import YoutubePlayer from './player/YoutubePlayer';
import Controller from './player/Controller';
import AppStateProvider from './contexts/AppStateProvider';
import Grid from '@material-ui/core/Grid';

const Jukebox = () => {
  const [username] = useUserName();
  const playerRef = useRef();
  return (
    <SocketProvider>
      <AppStateProvider>
        <div>Willkommen, {username}</div>
        <Grid container>
          <Grid item xs={12} md={3}>
            <Search />
          </Grid>
          <Grid item xs={12} md={6}>
            <YoutubePlayer referenz={playerRef} />
          </Grid>
          <Grid item xs={12} md={3}>
            adsf
          </Grid>
          <Grid item xs={12}>
            <Controller playerRef={playerRef} />
          </Grid>
        </Grid>
      </AppStateProvider>
    </SocketProvider>
  );
};

export default Jukebox;
