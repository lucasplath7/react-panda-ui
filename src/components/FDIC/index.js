import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@material-ui/core';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';

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
  const [ expanded, setExpanded ] = useState(false);
  const [ selectedCodes, setSelectedCode ] = useState(
    {
      selectedCodeOne: null,
      selectedCodeTwo: null,
      selectedCodeThree: null,
    }
  )

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  function handleSelectPeriodDate(event) {
    props.handlers.selectPeriodDate(
      event.target.value,
      props.data.periodDates
    );
  } 

  function handleSelectFiler(event) {
    props.handlers.selectFiler(event.target.value);
  }

  function handleSelectCode(event) {
    setSelectedCode({
      ...selectedCodes,
      [event.target.name]: event.target.value,
    })
  }

  function renderCodeOption(option) {
    return (
      <MenuItem key={option} value={option === 'NONE' ? '' : option}>
        { `${option}` }
      </MenuItem>
    )
  }

  function renderCodeOptions(options) {
    return options.map(option => renderCodeOption(option));
  }
  
  function renderSelectCode(number) {
    return props.data.callReportData ?
      <div className="SelectContainer">
        <InputLabel style={{color: 'white'}}>Select Code</InputLabel>
        <Select
          className="Select"
          name={"selectedCode" + number}
          onChange={handleSelectCode}
          value={selectedCodes["selectedCode" + number]}
          input={
            <OutlinedInput name="periodDate" labelWidth={100}/>
          }
        >
          { renderCodeOptions(props.data.allowableCodes) }
        </Select>
      </div> : null;
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
        selectedCodeOne={selectedCodes.selectedCodeOne}
        selectedCodeTwo={selectedCodes.selectedCodeTwo}
        selectedCodeThree={selectedCodes.selectedCodeThree}
      /> :
      null;
  }

  function renderExpandIconButton() {
    let styleProperties = {
      transform: expanded ? 'rotate(0deg)' : 'rotate(180deg)',
      transition: '.2s'
    }

    return (
      <IconButton
          className="InfoTextButton"
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          style={styleProperties}
        >
        <ExpandMoreIcon />
      </IconButton>
    )
  }

  function renderDescription() {
    // return <Collapse in={true}>asdf<div className="Information">
    //   <p>
    //     Probem: All federally insured banks must submit publicly available call report data to the fed
    //     on a quarterly basis. However, these must be accessed as bulk CSVs one quarter at a time, making
    //     it difficult to source data over a large span of time for analysis.</p>
    //   <p>
    //     Solution: Using the FDICs archaic system of SOAP requests we can pull all FDIC filer IDs then
    //     iterate requests for as many quarters of data as we would like.</p>
    //   <p>
    //     Purpose: This POC demonstrates the viability of quickly accessing data that should be easily 
    //     available for public consumption and analysis of institutions dependent on taxpayers.</p>
    //   <p>
    //     Note: After selecting a period date and filer, data for the previous three years will be fetched.
    //     Field codes to select from are limited to those with values within a certain range for visualization
    //   </p>
    // </div></Collapse>
     return(
      <div className="InfoTextContainer">
        {renderExpandIconButton()}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
            <Typography className="InfoText" paragraph>
              Problem: All federally insured banks must submit publicly available call report data to the fed
              on a quarterly basis. However, these must be accessed as bulk CSVs one quarter at a time, making
              it difficult to source data over a large span of time for analysis.
            </Typography>
            <Typography className="InfoText" paragraph>
              Solution:  Using the FDICs archaic system of SOAP requests we can pull all FDIC filer IDs then
              iterate requests for as many quarters of data as we would like.</Typography>
            <Typography className="InfoText" paragraph>
              Purpose:  This POC demonstrates the viability of quickly accessing data that should be easily 
              available  for public consumption and analysis of institutions dependent on taxpayers.</Typography>
            <Typography className="InfoText" paragraph>
              Note: After selecting a period date and filer, data for the previous three years will be fetched.
              Field codes to select from are limited to those with values within a certain range for visualization
            </Typography>
          </CardContent>
        </Collapse>
      </div>
     )
  }

  return (
    <div className="Content">
      {renderDescription()}
      {renderSelectPeriodDate()}
      {renderSelectFilerId()}
      {renderSelectCode("One")}
      {renderSelectCode("Two")}
      {renderSelectCode("Three")}
      {renderChart()}
    </div>
  )
}