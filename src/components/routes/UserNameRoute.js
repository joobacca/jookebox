import React, { useContext } from "react";
import { Route, Redirect, useParams } from "react-router-dom";
import { UserNameContext } from "../contexts/UserNameProvider";

const ProtectedRoute = ({ children, ...rest }) => {
  const { roomname } = useParams();
  const [name] = useContext(UserNameContext);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return name !== "" ? (
          children
        ) : (
          <Redirect
            from={roomname}
            to={{
              pathname: "/username",
              state: { from: location }
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
