import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useUserName } from './contexts/UserNameProvider';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  container: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  flexHorizontal: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
}));

const Login = () => {
  const [usernameVal, setName] = useState('');
  const [, set] = useUserName();
  const classes = useStyles();
  const history = useHistory();

  const submit = (e) => {
    e.preventDefault();
    set(usernameVal);
    history.push(history.location.state.from.pathname);
  };

  return (
    <Container>
      <form
        noValidate
        autoComplete="off"
        className={classes.container}
        onSubmit={submit}
      >
        <Typography variant="h6" component="p" color="primary">
          Enter a username
        </Typography>
        <Box display="flex" justifyContent="flex-around">
          <TextField
            value={usernameVal}
            onChange={(e) => setName(e.target.value)}
            label="Username"
            color="secondary"
            style={{ marginRight: 6 }}
          />
          <Button variant="contained" type="submit">
            Enter
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Login;
