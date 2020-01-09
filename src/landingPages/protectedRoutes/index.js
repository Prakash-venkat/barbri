import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const sessionDetails = {
    "/admin": "AdminSession",
    "/law-school": "LawSchoolSession",
    "/students": "StudentSession",
    "/proof-reader": "ProofReaderSession"
}

export const ProtectedRoute = ({ component: Component, path, ...rest }) => {
    return(
        <Route {...rest} render={props => (
            sessionStorage.getItem(sessionDetails[path]) || localStorage.getItem(sessionDetails[path])
                ? <Component {...props} /> //Move to the component
                : <Redirect to={{ pathname: '/', state: { from: props.location } }} /> //Redirect to login
        )} />
    )
}