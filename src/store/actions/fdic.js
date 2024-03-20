import actionTypes from './../actionTypes';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiURL } from '../../.config';

require('dotenv').config();

axiosRetry(axios, {
  retries: 50, // number of retries
  retryDelay: (retryCount) => {
    console.log(`retry attempt: ${retryCount}`);
    return retryCount * 1; // time interval between retries
  },
  retryCondition: (error) => {
    // if retry condition is not specified, by default idempotent requests are retried
    return error.response.status === 503;
  },
});

// Asynchronous Action Creators

// PERIOD DATES
export function fetchPeriodDates() {
  return dispatch => {
    dispatch(fetchPeriodDatesRequest());
    console.log('fetching from api url at: ', apiURL);
    axios.get(apiURL + '/fdic/getReportingPeriodEndDates')
      .then(resp => {
        const dates = resp.data.map(date => {
          return {
            id: date,
            label: date,
          }
        })
        return dispatch(fetchPeriodDatesSuccess(dates));
      })
      .catch(error => {
        return dispatch(fetchPeriodDatesFailure(error.message));
      });
  }
}

export function fetchPeriodDatesRequest() {
  return {
    type: actionTypes.FETCH_PERIOD_DATES_REQUEST,
  };
};

export function fetchPeriodDatesFailure(error) {
  return {
    error: `Something went wrong fetching period dates: ${error}`,
    type: actionTypes.FETCH_PERIOD_DATES_FAILURE,
  };
};

export function fetchPeriodDatesSuccess(dates) {
  return {
    data: dates,
    type: actionTypes.FETCH_PERIOD_DATES_SUCCESS,
  };
};

// FILERS
export function fetchFilers(from, to) {
  return dispatch => {
    dispatch(fetchFilersRequest());

    axios.get(apiURL + `/fdic/getFedIds?fromPeriodDate=${from}&&toPeriodDate=${to}`)
      .then(resp => {
        const limitedIds = resp.data.slice(1000);
        const filerIds = limitedIds.map(filerId => {
          return {
            id: filerId,
            label: filerId,
          }
        })
        return dispatch(fetchFilersSuccess(filerIds));
      })
      .catch(error => {
        return dispatch(fetchFilersFailure(error.message));
      });
  }
}

export function fetchFilersRequest() {
  return {
    type: actionTypes.FETCH_FILER_IDS_REQUEST,
  };
};

export function fetchFilersFailure(error) {
  return {
    error: `Something went wrong fetching filers: ${error}`,
    type: actionTypes.FETCH_FILER_IDS_FAILURE,
  };
};

export function fetchFilersSuccess(filerIds) {
  return {
    data: filerIds,
    type: actionTypes.FETCH_FILER_IDS_SUCCESS,
  };
};

// CALL REPORTS
export function fetchCallReports(fedId, dates) {
  return dispatch => {
    dispatch(fetchCallReportsRequest());
    let callReportData = {};
    Promise.all(dates.map(date => {
      return axios.get(apiURL + `/fdic/getCallReport?fedId=${fedId}&&periodEndDate=${date.id}`)
      .then(resp => {
        callReportData[date.id] = resp.data;
      })
      .catch(error => {
        return dispatch(fetchCallReportsFailure(error.message));
      });
    })).then(() => dispatch(fetchCallReportsSuccess(callReportData)));
  }
}

export function fetchCallReportsRequest() {
  return {
    type: actionTypes.FETCH_CALL_REPORTS_REQUEST,
  };
};

export function fetchCallReportsFailure(error) {
  return {
    error: `Something went wrong fetching CallReports: ${error}`,
    type: actionTypes.FETCH_CALL_REPORTS_FAILURE,
  };
};

export function fetchCallReportsSuccess(callReportData) {
  return {
    data: callReportData,
    type: actionTypes.FETCH_CALL_REPORTS_SUCCESS,
  };
};

// Synchronous Action Creators

// PERIOD DATES
export function selectPeriodDate(selectedDate, allDates) {
  const index = allDates.map(date => date.id).indexOf(selectedDate);
  const threeYearRange = allDates.slice(index, index + 12);

  return {
    data: { selectedDate, threeYearRange },
    type: actionTypes.SELECT_PERIOD_DATE,
  }
}

// FILERS
export function selectFiler(selectedFilerId) {
  return {
    data: selectedFilerId,
    type: actionTypes.SELECT_FILER_ID,
  }
}
