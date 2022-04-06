import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import { withStyles, makeStyles } from '@material-ui/styles';
import Pause from '@material-ui/icons/PauseCircleFilledRounded';
import Play from '@material-ui/icons/PlayCircleFilledRounded';
import Volume from './Volume';
import FastForward from '@material-ui/icons/FastForwardRounded';
import throttle from 'lodash/throttle';
import { useSocket } from '../../contexts/SocketProvider';
import { useAppState } from '../../contexts/AppStateProvider';

const useStyles = makeStyles(() => ({
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
  flex: {
    display: 'flex',
  },
}));


const Progress = withStyles({
  root: {
    color: '#fff',
    height: '100%',
  },
})(Slider);

const Controller = ({ playerRef }) => {
  const socket = useSocket();
  const { video, playBackState } = useAppState();
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    socket.emit('synchronizeApp');
  }, [socket]);
  
  useEffect(() => {
    const playVideo = (newVideo) => {
      playBackState.set(true);
      video.set(newVideo || {});
      setProgress(0);
    };
    socket.on('playVideo', playVideo);

    const emptyPlayback = () => {
      video.set({});
      setProgress(0);
      playBackState.set(false);
    };
    socket.on('emptyPlayback', emptyPlayback);

    const synchronizeProgress = throttle((value) => {
      let difference = value - progress;
      setProgress(value);
      if (difference > 5 || difference < -5) {
        playerRef.current.seekTo(value);
      }
    }, 1000);
    socket.on('synchronizeProgress', synchronizeProgress);

    const toggleState = (state) => {
      playBackState.set(state);
    };
    socket.on('toggle', toggleState);

    const setTimeCallback = (value) => {
      setProgress(value);
      playerRef.current.seekTo(value);
    };
    socket.on('setTime', setTimeCallback);

    return () => {
      socket.off('synchronizeProgress', synchronizeProgress);
      socket.off('setTime', setTimeCallback);
      socket.off('toggle', toggleState);
      socket.off('emptyPlayback', emptyPlayback);
      socket.off('playVideo', playVideo);
    };
  }, [socket, video, progress, playBackState, playerRef]);

  const togglePlayback = () => {
    socket.emit('toggle', {
      state: playBackState.current,
    });
  };

  const nextVideo = () => socket.emit('playNext');

  const handleProgressClick = throttle((event, newValue) => {
    socket.emit('setProgress', newValue);
  }, 500);

  return (
    <AppBar position="fixed" className={classes.appBar} color="primary">
      <ToolBar>
        <Grid container spacing={2} className={classes.alignCenter}>
          <Volume />
          <Grid item xs className={classes.alignCenter}>
            <Progress
              className={classes.slider}
              min={0}
              max={video.current.duration || 100}
              value={progress}
              onChange={handleProgressClick}
            />
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
