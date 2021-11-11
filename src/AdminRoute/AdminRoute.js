import React from "react";
import { Redirect, Route } from "react-router";
import Loader from "../Components/Loader/Loader";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children, ...rest }) => {
  const { loading, admin } = useAuth();
  console.log(admin);
  if (loading) {
    return <Loader />;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        admin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
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
