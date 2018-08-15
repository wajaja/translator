import { User as UserActions, } from 'actions'

export const initialState = {
    name: null,
    profilePic: null,
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
function User(state = initialState, action) {

    switch (action.type) {
        case UserActions.LOAD:
            if (action.user) {
                return [
                    ...action.user,
                ]
            }
            return state

        case UserActions.SET_USER:
            if (action.user) {
                return user
            }
            
            return state

        case UserActions.PUSH_WORD:
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

export default User
