import React from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/styles';

const Progress = withStyles({
  root: {
    color: '#fff',
  },
})(Slider);

const MediaProgress = ({ playerRef }) => {
  const handleChange = (event, newValue) => {
    console.log(newValue);
    // setVolume(newValue);
  };

  playerRef.current.onProgress = e => console.log(e);
  return <Progress defaultValue={0} onChange={handleChange} />;
};

export default MediaProgress;
