import React from "react";
import { Redirect, Route } from "react-router";
import Loader from "../Components/Loader/Loader";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
const PrivateRoute = ({ children, ...rest }) => {
  const { currentUser, loading, admin } = useAuth();
  if (loading) {
    return <Loader />;
  } else if (admin) {
    Swal.fire({
      icon: "warning",
      title: "Sorry Sir! You are an admin.",
      text: "If you wanna buy something please login as a normal user",
    });
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
              pathname: `${admin ? "/" : "/login"}`,
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
