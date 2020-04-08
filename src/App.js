import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import SocketProvider from './components/contexts/SocketProvider';
import UserNameProvider from './components/contexts/UserNameProvider';
import ProtectedRoute from './components/routes/UserNameRoute';
import Login from './components/Login';
import Jukebox from './components/Jukebox';
import Welcome from './components/Welcome';
import theme from './util/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh !important',
    overflow: 'hidden',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserNameProvider>
          <SocketProvider>
            <div className={classes.root}>
              <Switch>
                <Route exact path="/">
                  <Welcome />
                </Route>
                <Route path="/username">
                  <Login />
                </Route>
                <ProtectedRoute path="/:roomname">
                  <Jukebox />
                </ProtectedRoute>
              </Switch>
            </div>
          </SocketProvider>
        </UserNameProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
