import React, { useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { useSocket } from '../contexts/SocketProvider';
import { useAppState } from '../contexts/AppStateProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  playlist: {
    height: '50%',
    maxHeight: '50vh',
    overflow: 'auto',
  },
  item: {
    padding: theme.spacing(1),
  },
  paddingRight: {
    paddingRight: theme.spacing(4),
  },
}));

const innerTheme = createMuiTheme({
  palette: {
    text: {
      secondary: 'black',
    },
  },
});

const PlayList = () => {
  const { playList } = useAppState();
  const socket = useSocket();
  const classes = useStyles();

  useEffect(() => {
    const setPlaylist = (newPL) => playList.set(newPL);
    socket.on('synchronizePlayList', setPlaylist);
    return () => {
      socket.off('synchronizePlayList', setPlaylist);
    };
  }, [socket, playList]);

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h2" color="secondary">
        Playlist
      </Typography>
      <ThemeProvider theme={innerTheme}>
        <List className={classes.playlist}>
          {playList.current.length === 0 ? (
            <ListItem className={classes.item}>
              <Typography>Empty...</Typography>
            </ListItem>
          ) : (
            playList.current.map((el, i) => (
              <ListItem key={`${el.videoId}-${i}`} className={classes.item}>
                <ListItemText
                  primary={el.title}
                  className={classes.paddingRight}
                />
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
    </div>
  );
};

export default PlayList;
