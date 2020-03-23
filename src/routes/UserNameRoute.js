import React, { useContext } from "react";
import { UserNameContext } from "../components/contexts/UserNameProvider";
import { Route, Redirect, useParams } from "react-router-dom";

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
