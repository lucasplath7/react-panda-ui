// NPM Packages
import { connect } from 'react-redux';

// Custom Modules
import News from '../../components/News';
import actions from '../../store/actions';

export function mapStateToProps(state) {
  return {
    data: {
      error: state.news.error,
      fetchingNews: state.news.fetchingNews,
      newsData: state.news.newsData,
    },
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    handlers: {
      fetchNews: () => dispatch(actions.fetchNews()),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);