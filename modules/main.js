import React            from 'react'
import { render, hydrate }       from 'react-dom'
import { Provider }     from 'react-redux'
// import { syncHistoryWithStore } from 'react-router-redux'
import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
}                       from 'redux'
import {
    reducer as formReducer
}                       from 'redux-form'
import thunk            from 'redux-thunk'
import * as reducers    from 'reducers'
import { Router,  }     from 'react-router-dom'
const createHistory     = require('history/createBrowserHistory').default
const App               = require('./App').default
const Root              = require('./Root').default

require('./style.scss')

////////
/**
 * appElm
 * @type {Nullable.<Element>|Element}
 */
const appElm = document.getElementById('app')

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

/**
 * store
 */
export const store = createStore(
    combineReducers({
        ...reducers,
        form: formReducer
    }),
    preloadedState,
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
hydrate((
    <Provider store={store}>
        <Router history={history}>
            <App 
                store={store}
                location={location}
                dispatch={store.dispatch}>
                <Root
                    location={location}
                    dispatch={store.dispatch}/>
            </App>
        </Router>
    </Provider>
), appElm)
