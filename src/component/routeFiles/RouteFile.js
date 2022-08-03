import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import Login from "../pages/login/Login";
import Home from "../pages/dashboard/Home.js";
import ProtectedRoute from "./ProtectedRoute";
import { ProtectedRouteCheck } from "./ProtectedRoute";

export default function RouteFile() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouteCheck>
              <Login />
            </ProtectedRouteCheck>
          }
        ></Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/home"
            element={
              <Suspense fallback={<div>Loading</div>}>
                <Home />
              </Suspense>
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
