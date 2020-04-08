import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { UserNameContext } from './contexts/UserNameProvider';

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
  }
}));

const Login = () => {
  const [, set] = useContext(UserNameContext);
  const [usernameVal, setName] = useState('');
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
        <Typography>Gib einen Nutzernamen ein, um fortzufahren</Typography>
        <div className={classes.flexHorizontal}>
          <TextField
            value={usernameVal}
            onChange={(e) => setName(e.target.value)}
            label="Username"
            color="secondary"
          />
          <Button variant="contained" type="submit">
            Enter
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Login;
