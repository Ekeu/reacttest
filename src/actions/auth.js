import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';
//import setAuthToken from '../utils/setAuthToken';

//Load Client: Use this if taking your token from headers
/* export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    //const res = await axios.get('http://localhost:5000/api/auth');
    const res = await axios.get('http://localhost:5000/myinfo');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
}; */

//Load Client
export const loadUser = () => async (dispatch) => {
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
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register a Client
export const register = ({
  fname,
  lname,
  email,
  website,
  description,
  password,
}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    fname,
    lname,
    email,
    website,
    description,
    password,
  });

  try {
    const res = await axios.post(
      'http://localhost:5000/api/users',
      body,
      config
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//Sign in a Client
export const login = (identifiant, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    identifiant,
    password,
  });

  try {
    const res = await axios.post(
      'http://localhost:5000/auth',
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    //console.log(error)
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logging out client
export const logout = () => dispatch => {
  dispatch({type: LOGOUT})
}
