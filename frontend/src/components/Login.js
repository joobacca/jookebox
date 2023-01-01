import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useUserName } from '../contexts/UserNameProvider';

const Login = () => {
  const [usernameVal, setName] = useState('');
  const [, set] = useUserName();
  const history = useHistory();

  const submit = (e) => {
    e.preventDefault();
    set(usernameVal);
    history.push(history.location.state.from.pathname);
  };

  return (
    <Container>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={submit}
        sx={{
          display: 'flex',
          width: '100%',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
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
      </Box>
    </Container>
  );
};

export default Login;
