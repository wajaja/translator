import { SubmissionError } from 'redux-form'
import axios               from 'axios'
import jwtDecode           from 'jwt-decode'
import { BASE_PATH }       from 'config/api'
import setAuthorizationToken from 'utils/set-authorization-token'

function submit(values) {
    return axios.post(  BASE_PATH + '/api/signup', values).then(
        res => {
            const data = res.data;
            if(data.success) {
                localStorage.setItem && localStorage.setItem('xyz_translator_token', data.token);
                setAuthorizationToken(data.token);
            } else {
                throw new SubmissionError(data.message);
            }
        },
        err => {
            throw new SubmissionError(err)
        }
    )
}

export default submit
