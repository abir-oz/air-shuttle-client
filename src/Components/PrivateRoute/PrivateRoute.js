import React from 'react';
import { Redirect, Route } from 'react-router';

function PrivateRoute({ children, ...rest }) {



    const userJson = localStorage.getItem('loggedInUser');
    const user = JSON.parse(userJson);


    return (
        <Route
            {...rest}
            render={({ location }) =>
                user?.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;