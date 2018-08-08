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
 * load
 * Get notifications from API for user
 * Redux Action
 * Reference: http://redux.js.org/docs/basics/Actions.html
 * @returns {Function}
 */
export function load() {
    return (dispatch, getState) => {
        return new Promise((resolve => {
            resolve()
        }))
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
