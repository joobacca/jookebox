import React, { useState, useEffect } from 'react';
import TextInput from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Spinner from '@mui/material/CircularProgress';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import SearchResultList from './SearchResultList';
import { useSocket } from '../../contexts/SocketProvider';
import { useAppState } from '../../contexts/AppStateProvider';
import { Box } from '@mui/material';

const Search = () => {
  const socket = useSocket();
  const {
    search: { current, set },
  } = useAppState();
  const [val, setVal] = useState('Veil of Maya');
  const search = (e) => {
    e.preventDefault();
    socket.emit('search', val);
    set(null);
  };

  useEffect(() => {
    socket.on('searchResults', set);
    return () => socket.off('searchResults', set);
  }, [socket, set]);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: 2,
        boxSizing: 'border-box',
        height: 'calc(100% + 16px)',
        overflowY: 'auto',
      }}
    >
      <form onSubmit={search} style={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs>
            <TextInput
              onChange={(e) => setVal(e.target.value)}
              value={val}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item>
            <Button type="submit" color="secondary">
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
      <ThemeProvider
        theme={createTheme({
          palette: { text: { secondary: 'black' } },
        })}
      >
        <Box
          sx={{
            width: '100%',
            minHeight: '200px',
            height: 'calc(100% - 50px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflowY: 'auto',
          }}
        >
          {current === null ? <Spinner /> : <SearchResultList data={current} />}
        </Box>
      </ThemeProvider>
    </Grid>
  );
};

export default React.memo(Search);
