import React, { useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSocket } from '../contexts/SocketProvider';
import { useAppState } from '../contexts/AppStateProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

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
      <Typography variant="h5" component="h2">
        Playlist (aka Queue)
      </Typography>
      {playList.current.length === 0 ? (
        <Typography>Empty...</Typography>
      ) : (
        <List>
          {playList.current.map((el, i) => (
            <ListItem key={`${el.videoId}-${i}`}>
              <ListItemText primary={el.title} />
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
          ))}
        </List>
      )}
    </div>
  );
};

export default PlayList;
