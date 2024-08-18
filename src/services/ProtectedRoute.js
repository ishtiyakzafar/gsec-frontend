import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ Component,path, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("user");  
  return (
    <Route exact path={path}>
        {isAuthenticated ? <Component {...restOfProps} /> : <Redirect to="/" /> }
    </Route>
  );
}

export default ProtectedRoute;