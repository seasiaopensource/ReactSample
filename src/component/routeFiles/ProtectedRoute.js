import { Navigate, Outlet } from "react-router-dom";
import React from "react";

export const useAuth = () => {
  const userdata = JSON.parse(localStorage.getItem("user"));
  // console.log(userdata);
  const user = userdata?.access_token
    ? { loggedIn: true }
    : { loggedIn: false };

  return user.loggedIn;
};

export const ProtectedRouteCheck = ({ children }) => {
  const isAuth = useAuth();
  return isAuth ? <Navigate to="/home" /> : children;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRoute;
