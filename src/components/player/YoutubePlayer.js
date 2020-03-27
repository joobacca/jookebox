import React from 'react';
import ReactPlayer from 'react-player';
import { useAppState } from '../contexts/AppStateProvider';
import makeStyles from '@material-ui/styles/makeStyles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    paddingTop: '56.25%',
  },
  player: {
    position: 'absolute',
    width: '100% !important',
    height: '100% !important',
    top: 0,
    left: 0,
    pointerEvents: 'none',
  },
}));

const defaultProps = {
  playing: false,
  loop: false,
  controls: false,
  volume: 0.2,
  config: {
    youtube: {
      disablekb: 1,
      showinfo: 0,
      enablejsapi: 1,
    },
  },
};

const YoutubePlayer = ({ referenz }) => {
  const {
    video: { current },
    playBackState,
    volume,
  } = useAppState();
  console.log(playBackState.current);
  const classes = useStyles();
  return (
    current && (
      <>
        <div className={classes.wrapper}>
          <ReactPlayer
            {...defaultProps}
            url={`https://www.youtube.com/watch?v=${current.videoId}`}
            ref={referenz}
            samesite="none"
            secure="true"
            className={classes.player}
            playing={playBackState.current}
            volume={volume.current / 100}
            // onEnded={() => playBackState.set(false)}
            
          />
        </div>
        <Typography variant="h2">{current.title}</Typography>
        <Typography>{current.description}</Typography>
        {/* {current.author} */}
      </>
    )
  );
};

export default YoutubePlayer;
