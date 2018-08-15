import axios            from 'axios'

/**
 * LOAD
 * @type {string}
 */
export const LOAD = 'USER::LOAD'


/**
 * _loadResponse
 * @param response
 * @private
 */
export const _load = (response) => ({ type: LOAD, response, })

/**
* SET_USER
* @type {string}
*/
export const SET_USER = 'USER::SET_USER'
/**
 * _loadResponse
 * @param response
 * @private
 */
export const setUser = (user) => ({ type: "USER::SET_USER", user, })

/**
 * load
 * Get notifications from API for user
 * Redux Action
 * Reference: http://redux.js.org/docs/basics/Actions.html
 * @returns {Function}
 */
export function loadMe(userId) {
    return (dispatch, getState) => {
        return axios.post( BASE_PATH + 'api/users/' + userId, values).then(
            res => {
                const data = res.data;
                if(data.success) {
                    localStorage.setItem && localStorage.setItem('xyz_user_token', data.token);
                    setAuthorizationToken(data.token);
                } else {
                    throw new SubmissionError(data.message);
                }
                // dispatch(setCurrentUser(jwtDecode(token)));
            },
            err => {
                throw new SubmissionError(err)
            }
        )
    }
}
