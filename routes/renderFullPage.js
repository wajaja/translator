var qs                 =  require('qs') // Add this at the top of the file
var React              =  require('react')
var { renderToString } =  require('react-dom/server')
import { renderStylesToString } from 'emotion-server'
var {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
}                      = require('redux')
import {
    reducer as formReducer
}                       from 'redux-form'
var thunk              = require('redux-thunk')
var reducers           = require('../modules/reducers')
var { Provider }       = require('react-redux')
var { StaticRouter }   = require('react-router')

var template           = require('./template').default
var App                = require('../modules/App').default
var Root               = require('../modules/Root').default
const createHistory    = require('history/createMemoryHistory').default;

import Loadable         from 'react-loadable';
import { getBundles }   from 'react-loadable/webpack'
// import the manifest generated with in build
import stats            from '../build/react-loadable.json';

function renderFullPage(req, res, params) {
    const context = {};
    let   modules = [];
    const { preloadedState, url, title } = params;
    const history = createHistory({
        initialEntries: [ url ],   // The initial URLs in the history stack
        initialIndex: 0,                // The starting index in the history stack
        // keyLength: 6,                   // The length of location.key
        // A function to use to confirm navigation with the user. Required
        // if you return string prompts from transition hooks (see below)
        getUserConfirmation: null
    });


    // Create a new Redux store instance
    const store = createStore(
        combineReducers({
            ...reducers,
            form: formReducer
        }),
        preloadedState
    )

    // history={history}
    // Render the component to a string
    // renderStylesToString from react-select doc for SSR
    const body = renderStylesToString(renderToString(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <Provider store={store}>
                <StaticRouter
                    basename=''
                    location={url}
                    context={context}>
                    <App
                        store={store}>
                        <Root />
                    </App>
                </StaticRouter>
            </Provider>
        </Loadable.Capture>
    ))

    // Grab the initial state from our Redux store
    const finalState = store.getState()
    let bundles = getBundles(stats, modules);
    console.log('bundles', bundles.length);

    // Send the rendered page back to the client
    res.send(template({
        body,
        title,
        bundles,    //code spliting
        preloadedState: finalState
    }))
}

module.exports = renderFullPage;
// export default renderFullPage
