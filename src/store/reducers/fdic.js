import actionTypes from './../actionTypes';
import { createDictionaryFrom } from './../../helpers';

const initialState = {
  error: null,
  fetchingDates: false,
  fetchingFilers: false,
  fetchingReports: false,
  periodDates: null,
  selectedDate: '',
  threeYearRange: [],
  filers: null,
  selectedFilerId: '',
  callReportData: null,
}

function fdicReducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case actionTypes.FETCH_PERIOD_DATES_REQUEST:
      newState = {
        ...state,
        fetchingDates: true,
      };
      break;
    case actionTypes.FETCH_PERIOD_DATES_FAILURE:
      newState = {
        ...state,
        error: action.error,
        fetchingDates: false,
      };
      break;
    case actionTypes.FETCH_PERIOD_DATES_SUCCESS:
      newState = {
        ...state,
        periodDates: action.data,
        fetchingDates: false,
      }
      break;
    case actionTypes.SELECT_PERIOD_DATE:
      newState = {
        ...state,
        selectedDate: action.data.selectedDate,
        threeYearRange: action.data.threeYearRange,
      }
      break;
    case actionTypes.FETCH_FILER_IDS_REQUEST:
      newState = {
        ...state,
        fetchingFilers: true,
        callReportData: null,
      };
      break;
    case actionTypes.FETCH_FILER_IDS_FAILURE:
      newState = {
        ...state,
        error: action.error,
        fetchingFilers: false,
      };
      break;
    case actionTypes.FETCH_FILER_IDS_SUCCESS:
      newState = {
        ...state,
        filers: action.data,
        fetchingFilers: false,
      }
      break;
    case actionTypes.SELECT_FILER_ID:
      newState = {
        ...state,
        selectedFilerId: action.data,
      }
      break;
    case actionTypes.FETCH_CALL_REPORTS_REQUEST:
      newState = {
        ...state,
        fetchingReports: true,
        callReportData: null,
      };
      break;
    case actionTypes.FETCH_CALL_REPORTS_FAILURE:
      newState = {
        ...state,
        error: action.error,
        fetchingReports: false,
      };
      break;
    case actionTypes.FETCH_CALL_REPORTS_SUCCESS:
      newState = {
        ...state,
        callReportData: action.data,
        fetchingReports: false,
      }
      break;
    default:
      newState = state;
  }

  return newState;
}

export default fdicReducer;