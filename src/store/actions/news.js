import actionTypes from './../actionTypes';
import axios from 'axios';
import { apiURL } from '../../.config';

require('dotenv').config();

// Asynchronous Action Creators

// PERIOD DATES
export function fetchNews() {
  return dispatch => {
    dispatch(fetchNewsRequest());

    axios.get(apiURL + '/news/getFeeds')
      .then(resp => {
        return dispatch(fetchNewsSuccess(resp.data));
      })
      .catch(error => {
        return dispatch(fetchNewsFailure(error.message));
      });
  }
}

export function fetchNewsRequest() {
  return {
    type: actionTypes.FETCH_NEWS_REQUEST,
  };
};

export function fetchNewsFailure(error) {
  return {
    error: `Something went wrong fetching the news: ${error}`,
    type: actionTypes.FETCH_NEWS_FAILURE,
  };
};

export function fetchNewsSuccess(data) {
  return {
    data,
    type: actionTypes.FETCH_NEWS_SUCCESS,
  };
};
