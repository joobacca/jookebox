import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { useSocket } from '../../contexts/SocketProvider';
import { useAppState } from '../../contexts/AppStateProvider';
import { Box } from '@mui/material';

const innerTheme = createTheme({
  palette: {
    text: {
      secondary: 'black',
    },
  },
});

const PlayList = () => {
  const { playList } = useAppState();
  const socket = useSocket();

  useEffect(() => {
    socket.emit('getPlayList');
  }, [socket]);

  useEffect(() => {
    const setPlaylist = (newPL) => playList.set(newPL);
    socket.on('synchronizePlayList', setPlaylist);
    return () => {
      socket.off('synchronizePlayList', setPlaylist);
    };
  }, [socket, playList]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" component="h2" color="secondary">
        Playlist
      </Typography>
      <ThemeProvider theme={innerTheme}>
        <List
          sx={{
            height: '50%',
            maxHeight: '50vh',
            overflow: 'auto',
          }}
        >
          {playList.current.length === 0 ? (
            <ListItem sx={{ padding: 1 }}>
              <Typography>Empty...</Typography>
            </ListItem>
          ) : (
            playList.current.map((el, i) => (
              <ListItem key={`${el.videoId}-${i}`} sx={{ padding: 1 }}>
                <ListItemText primary={el.title} sx={{ paddingRight: 4 }} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => socket.emit('deleteFromPlaylist', i)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          )}
        </List>
      </ThemeProvider>
    </Box>
  );
};

export default PlayList;
