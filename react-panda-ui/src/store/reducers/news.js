import actionTypes from './../actionTypes';

const initialState = {
  error: null,
  fetchingNews: false,
  newsData: null,
}

function newsReducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case actionTypes.FETCH_NEWS_REQUEST:
      newState = {
        ...state,
        fetchingNews: true,
      };
      break;
    case actionTypes.FETCH_NEWS_FAILURE:
      newState = {
        ...state,
        error: action.error,
        fetchingNews: false,
      };
      break;
    case actionTypes.FETCH_NEWS_SUCCESS:
      newState = {
        ...state,
        newsData: action.data,
      }
      break;

    default:
      newState = state;
  }

  return newState;
}

export default newsReducer;