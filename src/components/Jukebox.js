import React, { useRef } from 'react';
import SocketProvider from './contexts/SocketProvider';
import Search from './search/Search';
import YoutubePlayer from './player/YoutubePlayer';
import Controller from './player/Controller';
import AppStateProvider from './contexts/AppStateProvider';
import Grid from '@material-ui/core/Grid';
import PlayList from './playlist/PlayList';

const Jukebox = () => {
  const playerRef = useRef();
  return (
    <SocketProvider>
      <AppStateProvider>
        <Grid container>
          <Grid item xs={12} md={3}>
            <Search />
          </Grid>
          <Grid item xs={12} md={6}>
            <YoutubePlayer referenz={playerRef} />
          </Grid>
          <Grid item xs={12} md={3}>
            <PlayList />
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
