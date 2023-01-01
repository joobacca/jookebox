import React from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useSocket } from '../contexts/SocketProvider';
import Search from './search/Search';
import YoutubePlayer from './player/YoutubePlayer';
import Controller from './player/Controller';
import AppStateProvider from '../contexts/AppStateProvider';
import PlayList from './playlist/PlayList';
import { useUserName } from '../contexts/UserNameProvider';
import UserList from './userlist/UserList';

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
  const theme = useTheme();
  const location = useLocation();
  const username = useUserName();
  const socket = useSocket();

  const [connection, setConnection] = React.useState(false);

  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const joinedRoom = () => setConnection(true);

  React.useEffect(() => {
    socket.on('joinedRoom', joinedRoom);
    socket.emit('joinRoom', { room: location.pathname, id: username });
    return () => {
      socket.off('joinedRoom', joinedRoom);
      socket.close();
    };
  }, [socket, location.pathname, username]);
  return (
    <AppStateProvider>
      {connection ? (
        <>
          <Box
            container
            sx={{
              width: '100%',
              paddingBottom: 64,
              height: '100%',
              '& > *': {
                height: '100%',
              },
            }}
          >
            {desktop && (
              <>
                <Grid item md={4} lg={4} xl={3}>
                  <Search />
                </Grid>
                <Grid item sm={12} md={6} lg={6} xl={6}>
                  <YoutubePlayer referenz={playerRef} />
                </Grid>
                <Grid item sm={12} md={2} lg={2} xl={3}>
                  <PlayList />
                  <UserList />
                </Grid>
              </>
            )}
            {!desktop && (
              <Box
                display="flex"
                flexDirection="column"
                sx={{
                  width: '100%',
                  paddingBottom: 64,
                  height: '100%',
                }}
              >
                <Box flexGrow={0}>
                  <YoutubePlayer referenz={playerRef} />
                </Box>
                <Box flexGrow={1}>
                  <AppBar position="static">
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="simple tabs example"
                    >
                      <Tab label="Search" />
                      <Tab label="Playlist" />
                      <Tab label="Userlist" />
                    </Tabs>
                  </AppBar>
                  <TabPanel value={value} index={0}>
                    <Search />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <PlayList />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <UserList />
                  </TabPanel>
                </Box>
              </Box>
            )}
          </Box>
          <Controller playerRef={playerRef} />
        </>
      ) : (
        <Box
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress style={{ marginBottom: 20 }} />
          Connecting...
        </Box>
      )}
    </AppStateProvider>
  );
};

export default Jukebox;
