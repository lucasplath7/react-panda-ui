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
      allowableCodes: state.fdic.callReportData && Object.keys(state.fdic.callReportData[state.fdic.threeYearRange[0].id]).map(fieldKey => {
        let existsForAllDates = true;
        let isNumber = false;
        let containsNonZero = false;
        let inRange = true;
        state.fdic.threeYearRange.forEach(year => {
          if (!Object.keys(state.fdic.callReportData[year.id]).includes(fieldKey)) existsForAllDates = false;
          if (!isNaN(state.fdic.callReportData[year.id][fieldKey])) {
            isNumber = true;
            if (parseInt(state.fdic.callReportData[year.id][fieldKey])) containsNonZero = true;
          }
          if (state.fdic.callReportData[year.id][fieldKey] < -20000 || state.fdic.callReportData[year.id][fieldKey] > 20000) inRange = false;
        });
        if (existsForAllDates && isNumber && containsNonZero && inRange) return fieldKey;
      }).filter(value => value)
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