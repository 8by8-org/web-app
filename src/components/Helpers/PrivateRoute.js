import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function PrivateRoute({ component: Component, ...routeProps }) {
    const { currentUser } = useAuth();
    return (
        <Route
            {...routeProps}
            render={props =>
                currentUser ? <Component {...props} /> : <Redirect to='/signup' />}
        />
    )
}
