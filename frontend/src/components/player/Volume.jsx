import React from 'react';
import IconButton from '@mui/material/IconButton';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import { useAppState } from '../../contexts/AppStateProvider';

const VolumeSlider = () => {
  const { volume } = useAppState();

  const handleVolumeClick = (event, newValue) => {
    setVolume(newValue);
  };

  const setVolume = (val) => {
    volume.set(val);
  };

  return (
    <Grid item container md={3} spacing={2}>
      <Grid item>
        <IconButton color="primary" onClick={() => setVolume(0)}>
          <VolumeDown />
        </IconButton>
      </Grid>
      <Grid
        item
        xs
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Slider
          value={volume.current}
          onChange={handleVolumeClick}
          aria-labelledby="continuous-slider"
        />
      </Grid>
      <Grid item>
        <IconButton color="primary" onClick={() => setVolume(100)}>
          <VolumeUp />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default VolumeSlider;
