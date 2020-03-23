import React, { useContext, useState, useEffect } from 'react';
import TextInput from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { SocketContext } from '../contexts/SocketProvider';
import Button from '@material-ui/core/Button';
import SearchResultList from './SearchResultList';
import Spinner from '@material-ui/core/CircularProgress';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    boxSizing: 'border-box',
  },
  form: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  wrapper: {
    minHeight: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Search = () => {
  const socket = useContext(SocketContext);
  const [val, setVal] = useState('Waschbär');
  const [result, setResult] = useState([]);

  const classes = useStyles();

  const search = e => {
    e.preventDefault();
    socket.emit('search', val);
    setResult(null);
  };

  const searchRes = data => {
    console.log(data);
    setResult(data);
  };

  useEffect(() => {
    socket.on('searchResults', searchRes);
  }, [socket]);

  const renderList = () => {
    if (result === null) {
      return <Spinner />;
    }
    return <SearchResultList data={result} />;
  };

  return (
    <Grid container spacing={2} className={classes.root}>
      <form onSubmit={search} className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs>
            <TextInput
              onChange={e => setVal(e.target.value)}
              value={val}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item>
            <Button type="submit">Suche</Button>
          </Grid>
        </Grid>
      </form>
      <Grid item xs={12}>
        <ThemeProvider
          theme={createMuiTheme({ palette: { text: { secondary: 'black' } } })}
        >
          <div className={classes.wrapper}>
            {result === null ? <Spinner /> : <SearchResultList data={result} />}
          </div>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
};

export default Search;
