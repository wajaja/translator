import React             from 'react';
import { Switch, Route } from 'react-router'
const Home              = require('./routes/Home').default
const Login             = require('./routes/Login').default
const Signup            = require('./routes/Signup').default
const Interveners       = require('./routes/Interveners').default
const About             = require('./routes/About').default
const Help              = require('./routes/Help').default
const Privacy           = require('./routes/Privacy').default
const NoMatch           = require('./routes/NoMatch').default

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
            <Route path="/about" children={() =>
                <About
                    {...props}
                />}
            />
            <Route path="/help" children={() =>
                <Help
                    {...props}
                />}
            />
            <Route path="/privacy" children={(rest) =>
                <Privacy {...props} {...rest} />}
            />
            {typeof window !== 'undefined' && <Route  children={(rest) => <NoMatch {...props} {...rest} />} />}
        </Switch>
    )
}
