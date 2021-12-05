import { combineReducers } from 'redux';

import fdic from './fdic';
import news from './news';

export default combineReducers({
  fdic,
  news,
})