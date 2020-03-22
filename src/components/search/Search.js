import React, { useContext, useState, useEffect } from 'react';
import TextInput from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { SocketContext } from '../SocketProvider';
import Button from '@material-ui/core/Button';
import SearchResultList from './SearchResultList';
import Spinner from '@material-ui/core/CircularProgress';

const Search = () => {
  const socket = useContext(SocketContext);
  const [val, setVal] = useState('Waschbär');
  const [result, setResult] = useState([]);

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
    <Grid container spacing={2}>
      <form onSubmit={search}>
        <Grid item xs={8}>
          <TextInput onChange={e => setVal(e.target.value)} value={val} />
        </Grid>
        <Grid item xs={4}>
          <Button type="submit">Suche</Button>
        </Grid>
      </form>
      <Grid item xs={12}>
        {renderList()}
      </Grid>
    </Grid>
  );
};

export default Search;
