import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute(props) {
  console.log(props.isAuthentication);

  if (!props.isAuthentication) {
    return <Redirect to="/play" />;
  }

  return <Route {...props} />;
}

export default ProtectedRoute;
