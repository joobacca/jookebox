import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  makeStyles,
} from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useUserName } from '../contexts/UserNameProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  form: {
    margin: `${theme.spacing(2)} 0`,
  },
}));

const Welcome = () => {
  const [roomName, setRoomName] = React.useState();
  const [userName, setUserName] = useUserName();
  const classes = useStyles();
  const history = useHistory();

  const submit = (e) => {
    e.preventDefault();
    setUserName(userName);
    history.push(roomName);
  };

  return (
    <Container maxWidth={'lg'} className={classes.root}>
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
                className={classes.form}
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
