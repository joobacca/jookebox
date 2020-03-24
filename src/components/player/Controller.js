import React, { useEffect, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
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
}));

const Volume = withStyles({
  root: {
    color: '#fff',
    width: '300px',
  },
})(Slider);

const Progress = withStyles({
  root: {
    color: '#fff',
    height: '100%',
  },
})(Slider);

const Controller = ({ playerRef }) => {
  const socket = useContext(SocketContext);
  const {
    video,
    progress,
    playBackState,
    volume,
  } = useAppState();
  const classes = useStyles();

  socket.on('playVideo', video => {
    video.set(video);
  });

  socket.on('setProgress', value => {
    progress.set(Math.floor(value * 100) / 100);
    playerRef.current.getInternalPlayer().seekTo(getSeconds(value));
  });

  socket.on('toggle', ({ state, time }) => {
    playBackState.set(state);
  });

  const togglePlayback = () => {
    socket.emit('toggle', {
      state: playBackState.current,
      time: playerRef.current.getInternalPlayer().getCurrentTime(),
    });
  };

  const nextVideo = () => socket.emit('playNext');

  const handleVolumeClick = (event, newValue) => {
    setVolume(newValue);
  };

  const getSeconds = percent =>
    playerRef.current.getInternalPlayer().getDuration() * (percent / 100);

  const handleProgressClick = throttle((event, newValue) => {
    socket.emit('setProgress', newValue);
  }, 200);

  const setVolume = val => {
    // React-Player accepts values between 1 and 0, while
    // the Mui-Slider gives values between 100 and 0
    volume.set(val);
  };

  return (
    <AppBar position="fixed" className={classes.appBar} color="primary">
      <ToolBar>
        <Grid container spacing={2}>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <VolumeDown onClick={() => setVolume(0)} />
              </Grid>
              <Grid item xs>
                <Volume
                  value={volume.current}
                  onChange={handleVolumeClick}
                  aria-labelledby="continuous-slider"
                />
              </Grid>
              <Grid item>
                <VolumeUp onClick={() => setVolume(100)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <Progress
              value={progress.current}
              onChange={handleProgressClick}
            />
          </Grid>
          <Grid item>
            <IconButton onClick={togglePlayback}>
              <Typography color="textSecondary">
                {playBackState.current ? <Pause /> : <Play />}
              </Typography>
            </IconButton>
            <IconButton onClick={nextVideo}>
              <Typography color="textSecondary">
                <FastForward />
              </Typography>
            </IconButton>
          </Grid>
        </Grid>
      </ToolBar>
    </AppBar>
  );
};

export default Controller;
