import React, { useContext } from "react";
import { UserNameContext } from "../UserNameProv";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, ...rest }) => {
  const { name } = useContext(UserNameContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        name !== "" ? (
          children
        ) : (
          <Redirect
            to={{
              to: "/username",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
