import React from 'react';
import ReactPlayer from 'react-player';
import makeStyles from '@material-ui/styles/makeStyles';
import responsiveFontSizes from '@material-ui/core/styles/responsiveFontSizes';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useAppState } from '../../contexts/AppStateProvider';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles({
  wrapper: {
    position: 'relative',
    paddingTop: '56.25%',
    height: 'unset !important',
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
});

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
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
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
          {desktop ? (
            <Box variant="div" p={2}>
              <Typography variant="h2" component="h1" className={classes.head}>
                {current.title}
              </Typography>
              <Typography>{current.description}</Typography>
            </Box>
          ) : (
            current.title && (
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    {current.title}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>{current.description}</Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )
          )}
        </ThemeProvider>
      </>
    )
  );
};

export default YoutubePlayer;
