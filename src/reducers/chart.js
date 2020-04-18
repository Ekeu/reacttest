import {
  DATA_SUCCESS,
  DATA_ERROR,
  VIEWERS_LOADED,
  VIEWERS_ERROR,
} from '../actions/types';

const initialState = {
  session_token: localStorage.getItem('token'),
  cdn: {},
  p2p: {},
  allData: {},
  maxCdn: null,
  maxP2p: null,
  maxSum: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case DATA_SUCCESS:
      return {
        ...state,
        ...payload,
        allData: payload.graphData,
        cdn: payload.graphData.cdn,
        p2p: payload.graphData.p2p,
        maxP2p: payload.aggregateData.p2p,
        maxCdn: payload.aggregateData.cdn,
        maxSum: payload.aggregateData.p2p + payload.aggregateData.cdn,
      };
    case DATA_ERROR:
      return {
        ...state,
        cdn: {},
        p2p: {},
        allData: {},
        maxCdn: null,
        maxP2p: null,
        maxSum: null,
      };
    default:
      return state;
  }
}
