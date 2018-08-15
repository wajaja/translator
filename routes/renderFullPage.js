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
var formReducer        = require('redux-form')
var thunk              = require('redux-thunk')
var reducers           = require('../modules/reducers')
var { Provider }       = require('react-redux')
var { StaticRouter }   = require('react-router')

var template           = require('./template').default
var App                = require('../modules/App').default
var Root               = require('../modules/Root').default
const createHistory    = require('history/createMemoryHistory').default;

function renderFullPage(req, res, params) {
    const context = {};
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
        <Provider store={store}>
            <StaticRouter
                basename=''
                location={url}
                context={context}>
                <App 
                    store={store}>
                    <Root location={{}} />
                </App>
            </StaticRouter>
        </Provider>
    ))

    // Grab the initial state from our Redux store
    const finalState = store.getState()

    // Send the rendered page back to the client
    res.send(template({
        body,
        title,
        preloadedState: finalState
    }))
}

module.exports = renderFullPage;
// export default renderFullPage
