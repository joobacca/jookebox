import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import { SocketContext } from '../contexts/SocketProvider';

const useStyles = makeStyles((theme) => ({
  secondary: {
    color: 'black',
  },
}));

const useListStyles = makeStyles((theme) => ({
  wrapper: {
    height: '100%',
    boxSizing: 'border-box',
  },
}));

const SearchResultList = ({ data }) => {
  const classes = useListStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <List className={classes.wrapper}>
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
  const classes = useStyles();
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
      <ListItemText
        className={classes.secondary}
        primary={title}
        secondary={description}
      />
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
