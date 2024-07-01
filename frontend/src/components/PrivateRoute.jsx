import React, { Component } from "react";
import { Navigate,Outlet } from "react-router-dom";

const PrivateRoute =({component:Component,...rest})=>{
    const token= localStorage.getItem("jwt");
    return token ? <Component /> : <Navigate to="/login"/>;
};

export default PrivateRoute