import React, { useContext, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { UserNameContext } from "./UserNameProv";

const Login = () => {
  const { name, set } = useContext(UserNameContext);
  const inputRef = useRef();
  const history = useHistory();
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          set(inputRef.current.value);
          history.push();
        }}
      >
        <input ref={inputRef} />
        <button rel="submit">Enter</button>
      </form>
    </div>
  );
};

export default Login;
