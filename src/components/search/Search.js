import React, { useState, useEffect } from 'react';
import TextInput from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Spinner from '@material-ui/core/CircularProgress';
import {
  ThemeProvider,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';

import SearchResultList from './SearchResultList';
import { useSocket } from '../contexts/SocketProvider';
import { useAppState } from '../contexts/AppStateProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    boxSizing: 'border-box',
    height: 'calc(100% + 16px)',
    overflowY: 'auto',
  },
  form: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  wrapper: {
    width: '100%',
    minHeight: '200px',
    height: 'calc(100% - 50px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflowY: 'auto',
  },
}));

const Search = React.memo(() => {
  const socket = useSocket();
  const {
    search: { current, set },
  } = useAppState();
  const [val, setVal] = useState('Veil of Maya');

  const classes = useStyles();

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
    <Grid container spacing={2} className={classes.root}>
      <form onSubmit={search} className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs>
            <TextInput
              onChange={(e) => setVal(e.target.value)}
              value={val}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item>
            <Button type="submit">Search</Button>
          </Grid>
        </Grid>
      </form>
      <ThemeProvider
        theme={createMuiTheme({
          palette: { text: { secondary: 'black' } },
        })}
      >
        <div className={classes.wrapper}>
          {current === null ? <Spinner /> : <SearchResultList data={current} />}
        </div>
      </ThemeProvider>
    </Grid>
  );
});

export default Search;
