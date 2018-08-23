import { Translator as TranslatorActions, } from 'actions'

export const initialState = {
    access_token: null,
    isAuthenticated: false,
}

/**
 * Translator Activity
 * Redux Reducer for Activity action
 * Reference: http://redux.js.org/docs/basics/Reducers.html
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
function Translator(state = initialState, action) {

    switch (action.type) {
        case TranslatorActions.LOAD:
            if (action.response) {
                return [
                    ...action.response,
                ]
            }
            return state

        case TranslatorActions.SET_AUTH:
            return Object.assign({}, state, {isAuthenticated: action.status})

        case TranslatorActions.SET_TOKEN:
            return Object.assign({}, state, {access_token: action.token})

        case TranslatorActions.PUSH_SENTENCE:
            return state.map((item) => {
                if (item.activities[0].actor.id === action.userID && item.verb == 'follow') {
                    const newItem = {...item}
                    newItem.activities[0].actor.Translator = 0
                    return newItem
                }
                return item
            })

        case TranslatorActions.PUSH_WORD:
            if (action.response) {
                return state.map((item) => {
                    if (item.activities[0].actor.id === action.userID && item.verb == 'follow') {
                        const newItem = {...item}
                        newItem.activities[0].actor.Translator = 1
                        return newItem
                    }
                    return item
                })
            }
            return state
    }

    return state
}

export default Translator
