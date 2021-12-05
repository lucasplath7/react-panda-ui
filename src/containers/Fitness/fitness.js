import { connect } from 'react-redux';

import Fitness from '../../components/Fitness';
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

export default connect(mapStateToProps, mapDispatchToProps)(Fitness);