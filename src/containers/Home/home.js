import { connect } from 'react-redux';

import Home from '../../components/Home';
import actions from '../../store/actions';

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