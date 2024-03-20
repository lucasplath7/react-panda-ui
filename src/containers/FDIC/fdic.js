// NPM Packages
import { connect } from 'react-redux';

// Custom Modules
import FDIC from '../../components/FDIC';
import actions from '../../store/actions';

export function mapStateToProps(state) {
  const callReportCodesArray = state.fdic.callReportData && Object.keys(state.fdic.callReportData).map((key) => {
    return Object.keys(state.fdic.callReportData[key])
  });
  const callReportCodes = callReportCodesArray ? new Set(callReportCodesArray.flat()) : null;
  
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
      callReportCodes: callReportCodes && [...callReportCodes]
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