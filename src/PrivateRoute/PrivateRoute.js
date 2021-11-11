import React from "react";
import { Redirect, Route } from "react-router";
import Loader from "../Components/Loader/Loader";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children, ...rest }) => {
  const { currentUser, loading, admin } = useAuth();
  if (loading) {
    return <Loader />;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser.email && !admin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: `${admin ? "/NotFound" : "/login"}`,
              state: {
                from: location,
              },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
