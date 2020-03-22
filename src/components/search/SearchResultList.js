import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { SocketContext } from '../SocketProvider';

const SearchResultList = ({ data }) => {
  return (
    <List>
      {data.map((el, i) => (
        <React.Fragment key={el.videoId}>
          {i !== 0 && <Divider variant="inset" component="li" />}
          <Item data={el} />
        </React.Fragment>
      ))}
    </List>
  );
};

const Item = ({ data }) => {
  const socket = React.useContext(SocketContext);
  const { title, url, description, thumbnail, author, videoId } = data;
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="" src={thumbnail} />
      </ListItemAvatar>
      <ListItemText primary={title} secondary={description} />
      <Button onClick={() => socket.emit('play', videoId)}>
        <AddCircleRoundedIcon />
      </Button>
      <Button>
        <PlayArrowRoundedIcon />
      </Button>
    </ListItem>
  );
};

export default SearchResultList;
