import {
    VIEWERS_LOADED,
    VIEWERS_ERROR,
  } from '../actions/types';
  
  const initialState = {
    session_token: localStorage.getItem('token'),
    concurrence: null,
    aggConcurrence: null,
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case VIEWERS_LOADED:
        return {
          ...state,
          ...payload,
          concurrence: payload.graphConccur.audience,
          aggConcurrence: payload.aggregateConcur.audience,
        };
      case VIEWERS_ERROR:
        return {
          ...state,
          concurrence: null,
          aggConcurrence: null,
        };
      default:
        return state;
    }
  }
  