import React, { useEffect } from 'react';
import {
  CircularProgress,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@material-ui/core';

import Chart from './chart';

import './index.css';

export default function FDIC(props) {
  useEffect(() => {
    if (!props.data.periodDates && !props.data.fetchingDates) {
      props.handlers.fetchPeriodDates();
    }
    if (props.data.selectedDate && !props.data.filers && !props.data.fetchingFilers) {
      props.handlers.fetchFilers(
        props.data.threeYearRange[props.data.threeYearRange.length -1].id,
        props.data.selectedDate
      )
    }
    if (props.data.selectedFilerId && !props.data.callReportData && !props.data.fetchingReports) {
      props.handlers.fetchCallReports(
        props.data.selectedFilerId,
        props.data.threeYearRange,
      )
    }
  })

  // const initialState = {
  // };
  // const [ state, setState ] = useState(initialState);

  function handleSelectPeriodDate(event) {
    props.handlers.selectPeriodDate(
      event.target.value,
      props.data.periodDates
    );
  } 

  function handleSelectFiler(event) {
    props.handlers.selectFiler(event.target.value);
  }

  function renderOption(option) {
    return (
      <MenuItem key={option.id} value={option.id}>
        { `${option.label}` }
      </MenuItem>
    )
  }

  function renderOptions(options) {
    return options.map(option => renderOption(option));
  }
  
  function renderSelectPeriodDate() {
    if (props.data.fetchingDates) {
      return (
        <div className="SelectContainer">
          <CircularProgress/>
        </div>
      )
    }

    return props.data.periodDates ?
      <div className="SelectContainer" style={{marginTop: '50px'}}>
        <InputLabel style={{color: 'white'}}>Select Period Date</InputLabel>
        <Select
          className="Select"
          onChange={handleSelectPeriodDate}
          value={props.data.selectedDate}
          input={
            <OutlinedInput name="periodDate" labelWidth={100}/>
          }
        >
          { renderOptions(props.data.periodDates) }
        </Select>
      </div> : null;
  }

  function renderSelectFilerId() {
    if (props.data.fetchingFilers) {
      return (
        <div className="SelectContainer">
          <CircularProgress/>
        </div>
      )
    }

    return props.data.filers ?
      <div className="SelectContainer">
        <InputLabel style={{color: 'white'}}>Select Filer ID</InputLabel>
        <Select
          className="Select"
          name="Select Filer"
          onChange={handleSelectFiler}
          value={props.data.selectedFilerId}
          input={
            <OutlinedInput name="periodDate" labelWidth={100}/>
          }
        >
          { renderOptions(props.data.filers) }
        </Select>
    </div> : null;
  }

  function renderChart() {
    if (props.data.fetchingReports === true)  {
      return (
        <div className="SelectContainer">
          <CircularProgress/>
        </div>
      )
    }
    
    return props.data.callReportData ?
      <Chart
        props={props}
        callReportData={props.data.callReportData}
        threeYearRange={props.data.threeYearRange}  
      /> :
      null;
  }

  function renderDescription() {
    return <div className="Information">
      <p>
        Probem: All federally insured banks must submit publicly available call report data to the fed
        on a quarterly basis. However, these must be accessed as bulk CSVs one quarter at a time, making
        it difficult to source data over a large span of time for analysis.</p>
      <p>
        Solution: Using the FDICs archaic system of SOAP requests we can pull all FDIC filer IDs then
        iterate requests for as many quarters of data as we would like.</p>
      <p>
        Purpose: This POC demonstrates the viability of quickly accessing data that should be easily 
        available for public consumption and analysis of institutions dependent on taxpayers.</p>
      <p>
        Note: After selecting a period date and filer, data for the previous three years will be fetched.
        Field codes to select from are limited to those with values within a certain range for visualization
      </p>
    </div>
  }

  return (
    <div className="Content">
      {renderDescription()}
      {renderSelectPeriodDate()}
      {renderSelectFilerId()}
      {renderChart()}
    </div>
  )
}