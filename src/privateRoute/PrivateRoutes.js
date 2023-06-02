import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";

const PrivateRoutes = () => {
  
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />  
      </Routes>
    </div>
  );
};

export default PrivateRoutes;
