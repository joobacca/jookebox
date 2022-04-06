import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, makeStyles } from '@material-ui/styles';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import { useAppState } from '../../contexts/AppStateProvider';

const useStyles = makeStyles(() => ({
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
  },

})(Slider);

const VolumeSlider = () => {
  const { volume } = useAppState();
  const classes = useStyles();

  const handleVolumeClick = (event, newValue) => {
    setVolume(newValue);
  };

  const setVolume = (val) => {
    volume.set(val);
  };

  return (
    <Grid item container md={3} spacing={2}>
      <Grid item>
        <IconButton onClick={() => setVolume(0)} className={classes.iconColor}>
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
  );
};

export default VolumeSlider;
