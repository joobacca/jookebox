import React from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { useSocket } from './contexts/SocketProvider';
import Search from './search/Search';
import YoutubePlayer from './player/YoutubePlayer';
import Controller from './player/Controller';
import AppStateProvider from './contexts/AppStateProvider';
import PlayList from './playlist/PlayList';
import { useUserName } from './contexts/UserNameProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingBottom: 64,
    height: '100%',
    '& > *': {
      maxHeight: '100%',
    },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Grid>
  );
}

const Jukebox = () => {
  const playerRef = React.useRef();
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const username = useUserName();
  const socket = useSocket();

  const [userList, setUserList] = React.useState([]);

  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    const connectHandler = () => {
      socket.emit('joinRoom', { room: location.pathname, id: username });
    };
    socket.on('connect', connectHandler);
    socket.on('synchronizeUserList', setUserList);
    return () => {
      socket.off('connect', connectHandler);
      socket.off('synchronizeUserList', setUserList);
    };
  }, [socket, location.pathname, username]);

  return (
    <AppStateProvider>
      <Grid container className={classes.root}>
        {desktop && (
          <>
            <Grid md={4} lg={4} xl={3}>
              <Search />
            </Grid>
            <Grid item sm={12} md={6} lg={6} xl={6}>
              <YoutubePlayer referenz={playerRef} />
            </Grid>
            <Grid item sm={12} md={2} lg={2} xl={3}>
              <PlayList />
            </Grid>
          </>
        )}
        {!desktop && (
          <div className={classes.root}>
            <YoutubePlayer referenz={playerRef} />
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab label="Search" />
                <Tab label="Playlist" />
                <Tab label="Chat?" />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <Search />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <PlayList />
            </TabPanel>
            <TabPanel value={value} index={2}>
              hiahihi
            </TabPanel>
          </div>
        )}
        {/* <Grid item sm>
          {/* <button onClick={() => socket.emit('clearInterval')}
          {userList.map((el) => (
            <div>{el}</div>
          ))}
        </Grid> */}
      </Grid>
      <Controller playerRef={playerRef} />
    </AppStateProvider>
  );
};

export default Jukebox;
