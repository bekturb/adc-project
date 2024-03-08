import React from 'react';
import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

const AuthenticatedRoutes = () => {
    const {isAuthenticated} = useSelector(state => state.auth)

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet/>;
};

export default AuthenticatedRoutes;