import React, { useEffect, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import { IconButton, Typography, Grid, Slider } from '@material-ui/core';
import { SocketContext } from '../contexts/SocketProvider';
import { useAppState } from '../contexts/AppStateProvider';
import { withStyles, makeStyles } from '@material-ui/styles';
import Pause from '@material-ui/icons/PauseCircleFilledRounded';
import Play from '@material-ui/icons/PlayCircleFilledRounded';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import FastForward from '@material-ui/icons/FastForwardRounded';
import throttle from 'lodash/throttle';

const useStyles = makeStyles(theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  button: {

  }
}));

const Volume = withStyles({
  root: {
    color: '#fff',
  },
})(Slider);

const Controller = ({ playerRef }) => {
  const socket = useContext(SocketContext);
  const appState = useAppState();

  socket.on('playVideo', id => {
    console.log('Server said play video :' + id);
    appState.video.set(id);
  });

  socket.on('synchronize', playList => {
    console.log('Server said next video');
    appState.playList.set(playList);
  });

  // socket.on('playVideo', id => {
  //   console.log('Server said next video');
  //   appState.video.set(appState.playList[0]);
  // });

  const toggleVideo = () => {
    playerRef.current.getInternalPlayer().getPlayerState() === 1
      ? playerRef.current.getInternalPlayer().pauseVideo()
      : playerRef.current.getInternalPlayer().playVideo();
    appState.playBackState.set(!appState.playBackState.current);
  };

  const nextVideo = () => {
    socket.emit('playNext');
  };

  const classes = useStyles();

  const handleChange = throttle((event, newValue) => {
    console.log(newValue);
    setVolume(newValue);
  }, 50);

  const setVolume = val => {
    appState.volume.set(val);
    playerRef.current.getInternalPlayer().setVolume(val);
  };

  return (
    <AppBar position="fixed" className={classes.appBar} color="primary">
      <ToolBar>
        <Grid container spacing={2} style={{ width: '300px' }}>
          <Grid item>
            <VolumeDown onClick={() => setVolume(0)} />
          </Grid>
          <Grid item xs>
            <Volume
              value={appState.volume.current}
              onChange={handleChange}
              aria-labelledby="continuous-slider"
            />
          </Grid>
          <Grid item>
            <VolumeUp onClick={() => setVolume(100)} />
          </Grid>
        </Grid>
        <div className={classes.grow} />
        <IconButton onClick={toggleVideo}>
          <Typography color="textSecondary">
            {appState.playBackState.current ? <Pause /> : <Play />}
          </Typography>
        </IconButton>
        <IconButton onClick={nextVideo}>
          <Typography color="textSecondary">
            <FastForward />
          </Typography>
        </IconButton>
      </ToolBar>
    </AppBar>
  );
};

export default Controller;
