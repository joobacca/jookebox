import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { UserNameContext } from "./contexts/UserNameProvider";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));

const Login = () => {
  const [, set] = useContext(UserNameContext);
  const [usernameVal, setName] = useState('');
  const classes = useStyles();
  const history = useHistory();

  const submit = e => {
    e.preventDefault();
    set(usernameVal);
    history.push(history.location.state.from.pathname);
  };

  return (
    <div>
      <form
        noValidate
        autoComplete="off"
        classes={classes.root}
        onSubmit={submit}
      >
        <TextField
          value={usernameVal}
          onChange={e => setName(e.target.value)}
          label="Username"
        />
        <Button variant="contained" type="submit">
          Enter
        </Button>
      </form>
    </div>
  );
};

export default Login;
