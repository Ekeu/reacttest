import axios from 'axios';
import { VIEWERS_LOADED, VIEWERS_ERROR } from './types';

export const loadData = async (body, http) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      http,
      body,
      config
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const extractConcurrentViewers = (from, to, aggregate) => async dispatch => {
  console.log("CONCURRENT VIEWERS");
  const body = {
    session_token: localStorage.token,
    from,
    to,
  };

  try {
    let aggregateConcur = null;
    const graphConccur = await loadData(body, 'http://localhost:5000/audience');
    console.log('extractViews -> res_1', graphConccur);
    
    if (aggregate !== null) {
        body.aggregate = aggregate
        aggregateConcur = await loadData(body, 'http://localhost:5000/audience');
    }
    console.log('extractaggregateViewers -> res_2', aggregateConcur);
    
    dispatch({
      type: VIEWERS_LOADED,
      payload: {
        graphConccur,
        aggregateConcur
      },
    }); 
  } catch (error) {
    console.log(error);
    dispatch({
      type: VIEWERS_ERROR,
    });
  }
}
