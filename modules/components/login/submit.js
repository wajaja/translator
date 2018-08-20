import { SubmissionError } from 'redux-form'
import axios               from 'axios'
import jwtDecode           from 'jwt-decode'
import { BASE_PATH }       from 'config/api'
import setAuthorizationToken from 'utils/set-authorization-token'
import {
    User as UserActions,
    Translator as TranslatorActions
}                           from 'actions'

function submit(values, dispatch, props) {
    return axios.post( BASE_PATH + 'api/login_check', values).then(
            res => {
                const data = res.data;
                if(data.success) {
                    localStorage.setItem && localStorage.setItem('xyz_translator_token', data.token);
                    setAuthorizationToken(data.token);
                    dispatch(UserActions.setUser(data.user));
                    dispatch(TranslatorActions.setAuth(true));
                    props.history.push('/');
                } else {
                    throw new SubmissionError(data.message);
                }
                // dispatch(setCurrentUser(jwtDecode(token)));
            },
            err => {
                throw new SubmissionError(err)
        })
}

export default submit
