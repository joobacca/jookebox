import React from 'react';
import ReactPlayer from 'react-player';
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useAppState } from '../../contexts/AppStateProvider';

let theme = responsiveFontSizes(createTheme());

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
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  return (
    current && (
      <>
        <Box
          sx={{
            position: 'relative',
            paddingTop: '56.25%',
            height: 'unset !important',
          }}
        >
          <ReactPlayer
            {...defaultProps}
            url={`https://www.youtube.com/embed/${current.videoId}`}
            ref={referenz}
            samesite="none"
            secure="true"
            playing={playBackState.current}
            volume={volume.current / 100}
            style={{
              position: 'absolute',
              width: '100% !important',
              height: '100% !important',
              top: 0,
              left: 0,
              pointerEvents: 'none',
            }}
          />
        </Box>
        <ThemeProvider theme={theme}>
          {desktop ? (
            <Box variant="div" p={2}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontSize: 22,
                }}
              >
                {current.title}
              </Typography>
              <Typography>{current.description}</Typography>
            </Box>
          ) : (
            current.title && (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{current.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{current.description}</Typography>
                </AccordionDetails>
              </Accordion>
            )
          )}
        </ThemeProvider>
      </>
    )
  );
};

export default YoutubePlayer;
