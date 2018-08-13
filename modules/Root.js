import React             from 'react';
import { Switch, Route } from 'react-router'
const Home              = require('./routes/Home').default
const Login             = require('./routes/Login').default
const Signup            = require('./routes/Signup').default
const Interveners       = require('./routes/Interveners').default
/**
 * rootRoute
 * @type {{path: string, getComponent: (function(*, *)), getChildRoutes: (function(*, *))}}
 */
export default (props) => {
    return (
        <Switch location={props.location}>
            <Route exact path="/" children={() =>
                <Home
                    {...props}
                />}
            />
            <Route path="/login" children={() =>
                <Login
                    {...props}
                />}
            />
            <Route path="/signup" children={() =>
                <Signup
                    {...props}
                />}
            />
            <Route path="/interveners" children={(rest) =>
                <Interveners {...props} {...rest} />}
            />
        </Switch>
    )
}
