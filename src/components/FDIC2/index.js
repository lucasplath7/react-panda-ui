// NPM Packages
import React, { useEffect, useState } from 'react';

// Material UI
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

// Custom Modules
import Chart from './chart';
import {
  CircularProgress,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from './../material-ui';

// Styles
import './index.css';

//Constants

const SELECT_FROM_PERIOD_DATE_LABEL = <Typography variant='body1'>Select From Period Date</Typography>;
const SELECT_TO_PERIOD_DATE_LABEL = <Typography variant='body1'>Select To Period Date</Typography>;
const SELECT_FILER_ID_LABEL = <Typography variant='body1'>Select Filer ID</Typography>;
const SELECT_CODE_LABEL = <Typography variant='body1'>Select Code</Typography>;

function FDIC2(props) {
  // Hooks
  useEffect(() => {
    if (!props.data.periodDates && !props.data.fetchingDates) {
      props.handlers.fetchPeriodDates();
    }
  });

  const [ state, setState ] = useState({
    fromPeriodDate: '',
    toPeriodDate: '',
    dateRange: [],
    selectedFilerId: '',
    selectedCodes: [],
  })
  console.log('state: ', state)

  // Handlers
  function handleSelectFromPeriodDate(event) {
    setState({
      ...state,
      fromPeriodDate: event.target.value,
      toPeriodDate: '',
      selectedFilerId: '',
      dateRange: [],
      selectedCodes: [],
    });
  }

  function handleSelectToPeriodDate(event) {
    const toPeriodDate = event.target.value;

    setState({
      ...state,
      toPeriodDate,
      selectedFilerId: '',
      selectedCodes: [],
      dateRange: props.data.periodDates.filter((periodDate) => {
        const date = new Date(periodDate.label).getTime();
        const from = new Date(state.fromPeriodDate).getTime();
        const to = new Date(toPeriodDate).getTime();

        return (date >= from) && (date <= to);
      })
    });

    props.handlers.fetchFilers(
      state.fromPeriodDate,
      toPeriodDate,
    );
  }

  function handleSelectFiler(event) {
    setState({
      ...state,
      selectedFilerId: event.target.value,
      selectedCodes: [],
    });

    props.handlers.fetchCallReports(
      event.target.value,
      state.dateRange
    )
  }

  function handleSelectCode(event) {
    setState({
      ...state,
      selectedCodes: [...state.selectedCodes, event.target.value,],
    })
  }

  function handleDeleteCodeChip(code) {
    setState({
      ...state,
      selectedCodes: state.selectedCodes.filter(c => c !== code)
    })
  }

  // Renderers
  function renderCircularProgress() {
    return (
      <div className="SelectContainer">
        <CircularProgress/>
      </div>
    )
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

  function renderSelectFromPeriodDate() {
    if (props.data.fetchingDates) return renderCircularProgress();

    return props.data.periodDates ?
      <div className="SelectContainer">
        <InputLabel style={{color: 'gainsboro'}}>{SELECT_FROM_PERIOD_DATE_LABEL}</InputLabel>
        <Select
          className="Select"
          onChange={handleSelectFromPeriodDate}
          value={state.fromPeriodDate}
          input={
            <OutlinedInput name="periodDate" labelWidth={100}/>
          }
        >
          { renderOptions(props.data.periodDates) }
        </Select>
      </div> : null;
  }

  function renderSelectToPeriodDate() {
    return state.fromPeriodDate ?
      <div className="SelectContainer">
        <InputLabel style={{color: 'gainsboro'}}>{SELECT_TO_PERIOD_DATE_LABEL}</InputLabel>
        <Select
          className="Select"
          onChange={handleSelectToPeriodDate}
          value={state.toPeriodDate}
          input={
            <OutlinedInput name="periodDate" labelWidth={100}/>
          }
        >
          { renderOptions(props.data.periodDates.filter(date => Date.parse(date.label) > Date.parse(state.fromPeriodDate))) }
        </Select>
      </div> : null;
  }

  function renderSelectFilerId() {
    if (props.data.fetchingFilers) return renderCircularProgress();

    return props.data.filers && state.toPeriodDate ?
      <div className="SelectContainer">
        <InputLabel style={{color: 'gainsboro'}}>{SELECT_FILER_ID_LABEL}</InputLabel>
        <Select
          className="Select"
          name="Select Filer"
          onChange={handleSelectFiler}
          value={state.selectedFilerId}
          input={
            <OutlinedInput name="periodDate" labelWidth={100}/>
          }
        >
          { renderOptions(props.data.filers) }
        </Select>
    </div> : 
    null;
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

  function renderSelectCode() {
    const disabled = state.selectedCodes.length > 4;

    return state.selectedFilerId && props.data.callReportCodes ?
      <div className="SelectContainer">
        <InputLabel style={{color: 'gainsboro'}}>{SELECT_CODE_LABEL}</InputLabel>
        <Tooltip
          placement='right'
          title={disabled ? 'Maximum Selections Reached' : ''}
        >
        <Select
          disabled={disabled}
          className="Select"
          name={"selecteCode"}
          onChange={handleSelectCode}
          value='Codes'
          input={
            <OutlinedInput name="periodDate" labelWidth={100}/>
          }
        >
          { renderCodeOptions(props.data.callReportCodes.filter(c => !state.selectedCodes.includes(c))) }
        </Select>
        </Tooltip>
      </div> : null;
  }

  function renderCodeChip(code) {
    return <Chip className='code-chip' color='primary' label={code} onDelete={() => handleDeleteCodeChip(code)} />
  }

  function renderCodeChips() {
    return (
      <div className='code-chips'>
        { state.selectedCodes.map(code => renderCodeChip(code))}
      </div>
    )
  }

  function renderChart() {
    return state.selectedCodes.length > 0 ?
      <Chart
        data={{
          dateRange: state.dateRange,
          selectedCodes: state.selectedCodes,
          callReportData: props.data.callReportData,
        }}
      /> : 
      <div 
      style={{backgroundColor: 'black', height: '800px', width: '1000px'}}
    />;
  }

  return (
    <Grid className='fdic-container' container columns={15}>
      <Grid 
        className='fdic-options'
        container
        item
        md={3}
        flexDirection='column'
      >
        {renderSelectFromPeriodDate()}
        {renderSelectToPeriodDate()}
        {renderSelectFilerId()}
        {renderSelectCode()}
        {renderCodeChips()}
      </Grid>
      <Grid className='fdic-chart' container item md={11} justifyContent='center'>
        { renderChart() }
      </Grid>
      <Grid className='fdic-info' container item md={1} justifyContent='center'>
      <div 
          style={{backgroundColor: 'black', height: '20px', width: '20px'}}
        />
      </Grid>
    </Grid>
  )
}

export default FDIC2;