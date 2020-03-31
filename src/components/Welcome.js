import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useUserName } from './contexts/UserNameProvider';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  form: {},
}));

const innerTheme = createMuiTheme({
  palette: {
    text: {
      secondary: 'black',
    },
  },
});

const Welcome = () => {
  const [roomName, setRoomName] = React.useState();
  const [userName, setUserName] = useUserName();
  const classes = useStyles();
  const history = useHistory();

  const submit = e => {
    e.preventDefault();
    setUserName(userName);
    history.push(roomName);
  };

  return (
    <Container maxWidth={'lg'} className={classes.root}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Container>
            <Typography variant="h1" component="h1">
              Welcome to Jookebox.
            </Typography>
          </Container>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Please enter a room name to get started.
              </Typography>
              <ThemeProvider theme={innerTheme}>
                <form
                  noValidate
                  autoComplete="off"
                  classes={classes.form}
                  onSubmit={submit}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        label="Username"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        value={roomName}
                        onChange={e => setRoomName(e.target.value)}
                        label="Roomname"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" type="submit">
                        Enter
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </ThemeProvider>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Welcome;
