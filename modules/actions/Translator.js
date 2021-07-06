/**
 * LOAD
 * @type {string}
 */
export const LOAD = 'TRANSLATOR::LOAD'

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
export const SET_AUTH = 'USER::SET_AUTH'
/**
 * _loadResponse
 * @param response
 * @private
 */
export const setAuth = (status) => ({ type: SET_AUTH, status, })

/**
* SET_USER
* @type {string}
*/
export const SET_TOKEN = 'USER::SET_TOKEN'
/**
 * _loadResponse
 * @param response
 * @private
 */
export const setToken = (token) => ({ type: SET_TOKEN, token, })

/**
 * load
 * Get notifications from API for user
 * Redux Action
 * Reference: http://redux.js.org/docs/basics/Actions.html
 * @returns {Function}
 */
export function loadUser(userId) {
    return (dispatch, getState) => {
        return axios.post( BASE_PATH + 'api/users/' + userId, values).then(
            res => {
                const data = res.data;
                // if(data.success) {
                //     localStorage.setItem && localStorage.setItem('xyz_user_token', data.token);
                //     setAuthorizationToken(data.token);
                // } else {
                //     throw new SubmissionError(data.message);
                // }
                // dispatch(setCurrentUser(jwtDecode(token)));
            },
            err => {
                throw new SubmissionError(err)
            }
        )
    }
}


/**
 * PUSH_WORD
 * @type {string}
 */
export const PUSH_WORD = 'TRANSLATOR::PUSH_WORD'

/**
 * _loadResponse
 * @param response
 * @private
 */
export const _pushWord = (word) => ({ type: PUSH_WORD, word, })

/**
 * PUSH_SENTENCE
 * @type {string}
 */
export const PUSH_SENTENCE = 'TRANSLATOR::PUSH_SENTENCE'

/**
 * _loadResponse
 * @param response
 * @private
 */
export const _pushSentence = (sentence) => ({ type: PUSH_SENTENCE, sentence, })


export const EDIT_TRANSLATED_REQUEST  = 'TRANSLATOR::EDIT_TRANSLATED_REQUEST'

const editTranslatedReq = () => ({type: EDIT_TRANSLATED_REQUEST, submitting: true,})

export const EDIT_TRANSLATED_RESPONSE  = 'TRANSLATOR::EDIT_TRANSLATED_RESPONSE'

export const editTranslatedRes = (data) => ({type: EDIT_TRANSLATED_RESPONSE, data })

export function editTranslated(data) {
    return (dispatch, getState) => {
        dispatch(editTranslatedReq())
        return new Promise((resolve, reject) => {
            axios.post(`${BASE_PATH}/api/places/new`, data).then(
                (res) => {
                    console.log(res.data)
                    const { data } = res.data;
                    dispatch(editTranslatedRes(data));
                    resolve(data)
                },
                (error) => {
                    if(error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if(error.request) {
                        console.log(error.request);
                    } else {
                        console.log(error.message);
                    }
                    console.log(error.config);
                    reject(error)
                })
        })
    }
}