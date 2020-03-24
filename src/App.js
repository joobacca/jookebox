import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProtectedRoute from './routes/UserNameRoute';
import Jukebox from './components/Jukebox';
import UserNameProvider from './components/contexts/UserNameProvider';
import Login from './components/Login';
import Welcome from './components/Welcome';
import { ThemeProvider } from '@material-ui/core';
import theme from './util/theme';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh !important',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <UserNameProvider>
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
      </UserNameProvider>
    </ThemeProvider>
  );
}

export default App;
