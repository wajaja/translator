import React             from 'react';
import { Switch, Route } from 'react-router'
import MyLoadable    from './components/MyLoadable'

const Home = MyLoadable({
    loader: () => import('./routes/Home'),
});
const Login = MyLoadable({
    loader: () => import('./routes/Login'),
});
const Signup = MyLoadable({
    loader: () => import('./routes/Signup'),
});
const Interveners = MyLoadable({
    loader: () => import('./routes/Interveners'),
});
const About = MyLoadable({
    loader: () => import('./routes/About'),
});
const Help = MyLoadable({
    loader: () => import('./routes/Help'),
});
const Privacy = MyLoadable({
    loader: () => import('./routes/Privacy'),
});
const NoMatch = MyLoadable({
    loader: () => import('./routes/NoMatch'),
});



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
