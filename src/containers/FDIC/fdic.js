import { connect } from 'react-redux';

import FDIC from '../../components/FDIC';
import actions from '../../store/actions';

export function mapStateToProps(state) {
  return {
    data: {
      error: state.fdic.error,
      fetchingDates: state.fdic.fetchingDates,
      fetchingFilers: state.fdic.fetchingFilers,
      fetchingReports: state.fdic.fetchingReports,
      periodDates: state.fdic.periodDates,
      selectedDate: state.fdic.selectedDate,
      threeYearRange: state.fdic.threeYearRange,
      filers: state.fdic.filers,
      selectedFilerId: state.fdic.selectedFilerId,
      callReportData: state.fdic.callReportData,
    },
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    handlers: {
      fetchCallReports: (fedId, dates) => dispatch(actions.fetchCallReports(fedId, dates)),
      fetchPeriodDates: () => dispatch(actions.fetchPeriodDates()),
      fetchFilers: (from, to) => dispatch(actions.fetchFilers(from, to)),
      selectPeriodDate: (selectedDate, allDates) => dispatch(actions.selectPeriodDate(selectedDate, allDates)),
      selectFiler: (filerId) => dispatch(actions.selectFiler(filerId)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FDIC);