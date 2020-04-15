import React from 'react';
import ReactPlayer from 'react-player';
import { useAppState } from '../contexts/AppStateProvider';
import makeStyles from '@material-ui/styles/makeStyles';
import responsiveFontSizes from '@material-ui/core/styles/responsiveFontSizes';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
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
  head: {
    fontSize: 22,
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
  const classes = useStyles();

  return (
    current && (
      <>
        <div className={classes.wrapper}>
          <ReactPlayer
            {...defaultProps}
            url={`https://www.youtube.com/embed/${current.videoId}`}
            ref={referenz}
            samesite="none"
            secure="true"
            className={classes.player}
            playing={playBackState.current}
            volume={volume.current / 100}
          />
        </div>
        <ThemeProvider theme={theme}>
          <Typography variant="h2" component="h1" className={classes.head}>
            {current.title}
          </Typography>
          <Typography>{current.description}</Typography>
        </ThemeProvider>
      </>
    )
  );
};

export default YoutubePlayer;
