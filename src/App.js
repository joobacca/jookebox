import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Switch, Route, useLocation } from "react-router-dom";

import ProtectedRoute from "./components/UserNameRoute";
import Jukebox from "./Jukebox";
import UserNameProv from "./UserNameProv";
import Login from "./Login";

export const SocketContext = React.createContext();

function App() { 
  const socket = io("http://localhost:5000");
  const location = useLocation();
  console.log(location);
  socket.on("connect", () => {
    socket.emit("joinRoom", location);
  });
  return (
    <UserNameProv>
      <SocketContext.Provider value={socket}>
        <Switch>
          <Route path={`/username`}>
            <Login />
          </Route>
          <ProtectedRoute path={`${location.pathname}`}>
            <Jukebox />
          </ProtectedRoute>
        </Switch>
      </SocketContext.Provider>
    </UserNameProv>
  );
}

export default App;
