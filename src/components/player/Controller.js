import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import {
  IconButton,
  Typography,
  Grid,
  Slider,
  Tooltip,
} from '@material-ui/core';
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
  slider: {
    '& .MuiSlider-thumb': {
      transition: 'left 1s linear',
    },
    '& .MuiSlider-thumb.MuiSlider-active': {
      transition: 'left 0s linear',
    },
    '& .MuiSlider-track': {
      transition: 'width 1s linear',
    },
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  iconColor: {
    color: '#fff',
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
  const { video, playBackState, volume, progress } = useAppState();
  const classes = useStyles();

  useEffect(() => {
    socket.on('playVideo', newVideo => {
      video.set(newVideo || {});
      progress.set(0);
      playBackState.set(true);
    });

    socket.on('emptyPlayback', () => {
      video.set({});
      progress.set(0);
      playBackState.set(false);
    });

    socket.on('setProgress', value => {
      progress.set(value);
      playerRef.current.seekTo(value);
    });

    socket.on('toggle', ({ state }) => {
      playBackState.set(state);
    });
  }, [socket, video, progress, playBackState, volume, playerRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current.getInternalPlayer().getPlayerState) {
        if (
          playBackState.current &&
          playerRef.current.getInternalPlayer().getPlayerState() === 1
        ) {
          progress.set(progress.current + 1);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [playerRef, playBackState, progress]);

  const togglePlayback = () => {
    socket.emit('toggle', {
      state: playBackState.current,
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
  }, 500);

  const setVolume = val => {
    // React-Player accepts values between 1 and 0, while
    // the Mui-Slider gives values between 100 and 0
    volume.set(val);
  };

  return (
    <AppBar position="fixed" className={classes.appBar} color="primary">
      <ToolBar>
        <Grid container spacing={2} className={classes.alignCenter}>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <IconButton
                  onClick={() => setVolume(0)}
                  className={classes.iconColor}
                >
                  <VolumeDown />
                </IconButton>
              </Grid>
              <Grid item xs className={classes.alignCenter}>
                <Volume
                  value={volume.current}
                  onChange={handleVolumeClick}
                  aria-labelledby="continuous-slider"
                />
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() => setVolume(100)}
                  className={classes.iconColor}
                >
                  <VolumeUp />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <Progress
              className={classes.slider}
              min={0}
              max={video.current.duration || 100}
              value={progress.current}
              onChange={handleProgressClick}
            />
          </Grid>
          <Grid item>
            <IconButton onClick={togglePlayback} className={classes.iconColor}>
              {playBackState.current ? <Pause /> : <Play />}
            </IconButton>
            <IconButton onClick={nextVideo} className={classes.iconColor}>
              <FastForward />
            </IconButton>
          </Grid>
        </Grid>
      </ToolBar>
    </AppBar>
  );
};

export default Controller;
