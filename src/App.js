import React from "react";
import { Button } from "@material-ui/core";
import io from 'socket.io-client';

const SocketContext = React.createContext();

function App() {
  const socket = io('http://localhost:5000');
  console.log(window.location.pathname);
  socket.on('connect', args => {
    socket.emit('joinRoom', window.location.pathname);
    console.log(args);
  });
  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Button variant="contained" color="primary">
            hi
          </Button>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </SocketContext.Provider>
  );
}

export default App;
