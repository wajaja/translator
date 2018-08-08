import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// import { syncHistoryWithStore } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'
import * as reducers from 'reducers'
import {Route, Switch, Router,  } from 'react-router-dom'
const createHistory  = require('history/createBrowserHistory').default
const App = require('./App').default
const Home = require('./routes/Home').default
const Login = require('./routes/Login').default
const Signup = require('./routes/Signup').default
const Interveners = require('./routes/Interveners').default

require('./style.scss')

/**
 * rootRoute
 * @type {{path: string, getComponent: (function(*, *)), getChildRoutes: (function(*, *))}}
 */
const Root = (props) => {
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

////////
/**
 * appElm
 * @type {Nullable.<Element>|Element}
 */
const appElm = document.getElementById('app')


/**
 * store
 */
export const store = createStore(
    combineReducers({
        ...reducers,
        form: formReducer
    }),
    compose(
        applyMiddleware(thunk),
        (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    )
)

/**
 * history
 */
const supportsHistory = 'pushState' in window.history,
history        = createHistory({
    basename: "/", // The base URL of the app (see below)
    forceRefresh: !supportsHistory,      // Set true to force full page refreshes
    keyLength: 12,             // The length of location.key
    // A function to use to confirm navigation with the user (see below)
    //getUserConfirmation: (message, callback) => callback(window.confirm(message))
});
/**
 * render Provider
 */
render((
    <Provider store={store}>
        <Router history={history}>
            <App
                location={location}
                dispatch={store.dispatch}>
                <Root
                    location={location}
                    dispatch={store.dispatch}/>
            </App>
        </Router>
    </Provider>
), appElm)
