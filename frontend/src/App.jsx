import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import SocketProvider from './contexts/SocketProvider';
import UserNameProvider from './contexts/UserNameProvider';
import ProtectedRoute from './routes/UserNameRoute';
import Login from './components/Login';
import Jukebox from './components/Jukebox';
import Welcome from './components/Welcome';
import theme from './util/theme';
import AppStateProvider from './contexts/AppStateProvider';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserNameProvider>
          <SocketProvider>
            <AppStateProvider>
              <Box
                sx={{
                  height: '100vh !important',
                  overflow: 'hidden',
                }}
              >
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
              </Box>
            </AppStateProvider>
          </SocketProvider>
        </UserNameProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
