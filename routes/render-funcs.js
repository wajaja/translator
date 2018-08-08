import qs from 'qs' // Add this at the top of the file
import { renderToString } from 'react-dom/server'
import React from 'react'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'
import * as reducers from './../modules/reducers'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'

import App from './modules/App'

function renderFullPage(html, preloadedState) {
    return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}


​
function handleRender(req, res) {
    // Read the counter from the request, if provided
    const params = qs.parse(req.query)

    //from session​
    // Compile an initial state
    let preloadedState = {
        App: {
            access_token: 'myToken'
        }
    }

    const context = {};
​
    // Create a new Redux store instance
    const const store = createStore(
        combineReducers({
            ...reducers,
            form: formReducer
        }),
        preloadedState

        compose(
            applyMiddleware(thunk),
            (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
        )
    )
​
    // Render the component to a string
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter
                location={req.url}
                context={context}>
                <App
                    location={req.url}
                    dispatch={store.dispatch}>
                    <Root
                        location={req.url}
                        dispatch={store.dispatch}/>
                </App>
            </StaticRouter>
        </Provider>
    )
​
    // Grab the initial state from our Redux store
    const finalState = store.getState()
​
    // Send the rendered page back to the client
    res.send(renderFullPage(html, finalState))
}
