// NPM Packages
import { connect } from 'react-redux';

// Custom Modules
import Home from '../../components/Home';

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

export default connect(mapStateToProps, mapDispatchToProps)(Home);