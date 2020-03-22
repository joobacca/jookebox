import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProtectedRoute from './routes/UserNameRoute';
import Jukebox from './components/Jukebox';
import UserNameProvider from './components/UserNameProvider';
import Login from './components/Login';
import Welcome from './components/Welcome';
import { ThemeProvider } from '@material-ui/core';
import theme from './util/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserNameProvider>
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
      </UserNameProvider>
    </ThemeProvider>
  );
}

export default App;
