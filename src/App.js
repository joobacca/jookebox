import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import ProtectedRoute from "./components/UserNameRoute";
import Jukebox from "./Jukebox";
import UserNameProv from "./UserNameProv";
import Login from "./Login";
import Welcome from "./Welcome";
import SocketProv from "./SocketProv";

function App() { 
  const location = useLocation();
  return (
    <UserNameProv>
      <SocketProv>
        <Switch>
          <Route path={`/username`}>
            <Login />
          </Route>
          <ProtectedRoute path={`${location.pathname}`}>
            <Jukebox />
          </ProtectedRoute>
          <Route path="/">
            <Welcome />
          </Route>
        </Switch>
      </SocketProv>
    </UserNameProv>
  );
}

export default App;
