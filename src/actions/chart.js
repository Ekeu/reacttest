import axios from 'axios';
import { DATA_SUCCESS, DATA_ERROR } from './types';

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

export const extractchartData = (aggregate, from, to) => async dispatch => {
  console.log("CHART DATA");
  const body = {
    session_token: localStorage.token,
    from,
    to,
  };

  try {
    let aggregateData = null;
    const graphData = await loadData(body, 'http://localhost:5000/bandwidth');
    console.log('extractchartData -> res_1', graphData);
    
    if (aggregate !== null) {
        body.aggregate = aggregate
        aggregateData = await loadData(body, 'http://localhost:5000/bandwidth');
    }
    console.log('extractaggregateData -> res_2', aggregateData);
    
    dispatch({
      type: DATA_SUCCESS,
      payload: {
          graphData,
          aggregateData
      },
    }); 
  } catch (error) {
    console.log(error);
    dispatch({
      type: DATA_ERROR,
    });
  }
}