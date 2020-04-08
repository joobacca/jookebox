import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import { withStyles, makeStyles } from '@material-ui/styles';
import Pause from '@material-ui/icons/PauseCircleFilledRounded';
import Play from '@material-ui/icons/PlayCircleFilledRounded';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import FastForward from '@material-ui/icons/FastForwardRounded';
import throttle from 'lodash/throttle';
import { useSocket } from '../contexts/SocketProvider';
import { useAppState } from '../contexts/AppStateProvider';

const useStyles = makeStyles((theme) => ({
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
  const socket = useSocket();
  const { video, playBackState, volume, progress } = useAppState();
  const classes = useStyles();

  useEffect(() => {
    const playVideo = (newVideo) => {
      video.set(newVideo || {});
      progress.set(0);
      playBackState.set(true);
    };
    socket.on('playVideo', playVideo);

    const emptyPlayback = () => {
      video.set({});
      progress.set(0);
      playBackState.set(false);
    };
    socket.on('emptyPlayback', emptyPlayback);

    const setTimeCallback = (value) => {
      let difference = value - progress.current;
      progress.set(value);
      console.log(value, progress.current);
      if (difference > 5 || difference < -5) {
        
        playerRef.current.seekTo(value);
      }
    };
    socket.on('setTime', setTimeCallback);

    const toggleState = (state) => {
      playBackState.set(state);
    };
    socket.on('toggle', toggleState);

    return () => {
      socket.off('setTime', setTimeCallback);
      socket.off('toggle', toggleState);
      socket.off('emptyPlayback', emptyPlayback);
      socket.off('playVideo', playVideo);
    };
  }, [socket, video, progress, playBackState, volume, playerRef]);

  const togglePlayback = () => {
    socket.emit('toggle', {
      state: playBackState.current,
    });
  };

  const nextVideo = () => socket.emit('playNext');

  const handleVolumeClick = (event, newValue) => {
    setVolume(newValue);
  };

  const handleProgressClick = throttle((event, newValue) => {
    socket.emit('setProgress', newValue);
  }, 500);

  const setVolume = (val) => {
    volume.set(val);
  };

  return (
    <AppBar position="fixed" className={classes.appBar} color="primary">
      <ToolBar>
        <Grid container spacing={2} className={classes.alignCenter}>
          <Grid item container md={3} spacing={2}>
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
          <Grid item xs md={6}>
            <Progress
              className={classes.slider}
              min={0}
              max={video.current.duration || 100}
              value={progress.current}
              onChange={handleProgressClick}
            />
          </Grid>
          <Grid item md={3}>
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
