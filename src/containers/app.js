// NPM Packages
import { connect } from 'react-redux';

import App from './../components/App';

export function mapStateToProps(state) {
  return {
    data: {
    },
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    handlers: {
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);