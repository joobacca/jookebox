import React from 'react';
import { useAppState } from '../contexts/AppStateProvider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSocket } from '../contexts/SocketProvider';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  }
}));

const PlayList = () => {
  const { playList } = useAppState();
  const socket = useSocket();
  const classes = useStyles();
  socket.on('synchronizePlayList', newPL => {
    console.log(newPL);
    playList.set(newPL);
  });
  console.log(playList.current);
  return (
    <div className={classes.root}>
      <Typography variant="h4">Playlist (aka Queue)</Typography>
      {playList.current.length === 0 ? (
        <Typography>Empty...</Typography>
      ) : (
        <List>
          {playList.current.map((el, i) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
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
