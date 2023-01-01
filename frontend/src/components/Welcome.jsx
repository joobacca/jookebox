import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { useUserName } from '../contexts/UserNameProvider';

const Welcome = () => {
  const [roomName, setRoomName] = useState();
  const [userName, setUserName] = useUserName();
  const history = useHistory();

  const submit = (e) => {
    e.preventDefault();
    setUserName(userName);
    history.push(roomName);
  };

  return (
    <Container maxWidth={'lg'} sx={{
      display: 'flex',
      alignItems: 'center',
      height: '100%',
    }}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Container>
            <Box
              color="primary.light"
              fontSize={{
                xs: 'h4.fontSize',
                sm: 'h3.fontSize',
                md: 'h2.fontSize',
              }}
            >
              Welcome to Jookebox.
            </Box>
          </Container>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" color="secondary">
                Please enter a room name to get started.
              </Typography>
              <form
                noValidate
                autoComplete="off"
                onSubmit={submit}
                
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      label="Username"
                      color="secondary"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      color="secondary"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                      label="Roomname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box color="white">
                      <Button
                        variant="contained"
                        type="submit"
                        color="secondary"
                        border={1}
                        borderColor="white"
                      >
                        Enter
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Welcome;
