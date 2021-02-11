import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "services/auth-service";

export default props => {
  const { component: Component, ...rest } = props;
  
  return (
    <Route
      {...rest}
      render={props =>
        authService.isAuthenticated() ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={{ pathname: "/home", state: { LoginNeeded: true } }} />
        )
      }
    />
  );
};
