import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import useTheme from '@mui/material/styles/useTheme';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { SocketContext } from '../../contexts/SocketProvider';

const SearchResultList = ({ data }) => {
  return (
    <List
      sx={{
        height: '100%',
        maxHeight: 'calc(100vh - 56px)',
        boxSizing: 'border-box',
      }}
    >
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
  const theme = useTheme();
  const {
    title,
    description,
    thumbnail,
    author,
    videoId,
    duration: { seconds },
  } = data;
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  return (
    <ListItem alignItems="flex-start">
      {isDesktop && (
        <ListItemAvatar>
          <Avatar alt={title} src={thumbnail} />
        </ListItemAvatar>
      )}
      <ListItemText color="#000" primary={title} secondary={description} />
      <div>
        <IconButton
          onClick={() =>
            socket.emit('play', {
              title,
              videoId,
              description,
              author,
              duration: seconds,
            })
          }
        >
          <PlayArrowRoundedIcon />
        </IconButton>
        <IconButton
          onClick={() =>
            socket.emit('addToPlaylist', {
              title,
              videoId,
              description,
              author,
              duration: seconds,
            })
          }
        >
          <AddCircleRoundedIcon />
        </IconButton>
      </div>
    </ListItem>
  );
};

export default SearchResultList;
