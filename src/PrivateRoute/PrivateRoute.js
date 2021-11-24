import React from "react";
import { Redirect, Route, useHistory } from "react-router";
import Loader from "../Components/Loader/Loader";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
const PrivateRoute = ({ children, ...rest }) => {
  const history = useHistory();
  const {
    currentUser: { email },
    loading,
    admin,
  } = useAuth();
  if (loading) {
    return <Loader />;
  } else if (admin) {
    Swal.fire({
      icon: "warning",
      title: "Sorry Sir! You are an admin.",
      text: "If you wanna buy something please login as a normal user",
    });
    history.push("/");
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        email && !admin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
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
