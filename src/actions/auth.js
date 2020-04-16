import axios from 'axios';
import {setAlert} from './alert'
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

//Register a Client
export const register = ({fname, lname, email, website, description, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({fname, lname, email, website, description, password});

    try {
        const res = await axios.post('http://localhost:5000/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        const errors = error.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}