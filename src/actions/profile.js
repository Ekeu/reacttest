import axios from 'axios'

import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types'

//Get current profile
export const extractCurrentClient = () => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = {
        session_token: localStorage.token
      }
      try {
        const res = await axios.post(
          'http://localhost:5000/myinfo',
          body,
          config
        );
        dispatch({
          type: GET_PROFILE,
          payload: res.data,
        });
      } catch (error) {
        dispatch({
          type: PROFILE_ERROR,
          payload: {msg: error.response.statusText,status: error.response.status }
        });
      }
}
