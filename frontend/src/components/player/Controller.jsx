import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Pause from '@mui/icons-material/PauseCircleFilledRounded';
import Play from '@mui/icons-material/PlayCircleFilledRounded';
import Volume from './Volume';
import FastForward from '@mui/icons-material/FastForwardRounded';
import throttle from 'lodash/throttle';
import { useSocket } from '../../contexts/SocketProvider';
import { useAppState } from '../../contexts/AppStateProvider';

const Controller = ({ playerRef }) => {
  const socket = useSocket();
  const { video, playBackState } = useAppState();
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
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <ToolBar>
        <Grid
          container
          spacing={2}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Volume />
          <Grid item xs sx={{ display: 'flex', alignItems: 'center' }}>
            <Slider
              min={0}
              max={video.current.duration || 100}
              value={progress}
              onChange={handleProgressClick}
              sx={{
                '& .MuiSlider-thumb': {
                  transition: 'left 1s linear',
                },
                '& .MuiSlider-thumb.MuiSlider-active': {
                  transition: 'left 0s linear',
                },
                '& .MuiSlider-track': {
                  transition: 'width 1s linear',
                },
                color: '#fff',
                height: '100%',
              }}
            />
            <IconButton onClick={togglePlayback}>
              {playBackState.current ? <Pause /> : <Play />}
            </IconButton>
            <IconButton onClick={nextVideo}>
              <FastForward />
            </IconButton>
          </Grid>
        </Grid>
      </ToolBar>
    </AppBar>
  );
};

export default Controller;
