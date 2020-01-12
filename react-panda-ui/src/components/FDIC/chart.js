import React, { useState } from 'react';
import {
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@material-ui/core';
import { Line } from 'react-chartjs-2';


import './index.css';

export default function Chart(props) {

  // useEffect(() => {
   
  // })

  const initialState = {
    selectedFieldOne: null,
    selectedFieldTwo: null,
    selectedFieldThree: null,
    allowableFields: Object.keys(props.callReportData[props.threeYearRange[0].id]).map(fieldKey => {
      let existsForAllDates = true;
      let isNumber = false;
      let containsNonZero = false;
      let inRange = true;
      props.threeYearRange.forEach(year => {
        if (!Object.keys(props.callReportData[year.id]).includes(fieldKey)) existsForAllDates = false;
        if (!isNaN(props.callReportData[year.id][fieldKey])) {
          isNumber = true;
          if (parseInt(props.callReportData[year.id][fieldKey])) containsNonZero = true;
        }
        if (props.callReportData[year.id][fieldKey] < -20000 || props.callReportData[year.id][fieldKey] > 20000) inRange = false;
      });
      if (existsForAllDates && isNumber && containsNonZero && inRange) return fieldKey;
    }).filter(value => value)
  };

  const [ state, setState ] = useState(initialState);

  function handleSelectField(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  function renderOption(option) {
    return (
      <MenuItem key={option} value={option === 'NONE' ? '' : option}>
        { `${option}` }
      </MenuItem>
    )
  }

  function renderOptions(options) {
    return options.map(option => renderOption(option));
  }
  
  function renderSelectField(number) {
    return props.callReportData ?
      <div className="SelectContainer">
        <InputLabel style={{color: 'white'}}>Select Field</InputLabel>
        <Select
          className="Select"
          name={"selectedField" + number}
          onChange={handleSelectField}
          value={state["selectedField" + number]}
          input={
            <OutlinedInput name="periodDate" labelWidth={100}/>
          }
        >
          { renderOptions(state.allowableFields) }
        </Select>
      </div> : null;
  }

  function renderLineChart() {
    const selectedFields = [state.selectedFieldOne, state.selectedFieldTwo, state.selectedFieldThree].filter(value => value);
    const range = props.threeYearRange;
    const labels = range.map(date => date.id).sort((a, b) => new Date(a) - new Date(b));
    const colors = ['#26CE1E','#BD4FFC','#FCBD4F','#4FC2FC','#FC4F6C']

    const dataSets = selectedFields.map((field, index) => {
      const points = labels.map((date) => {
        return {x: date.id, y: props.callReportData[date][field]};
      })
      return {
        data: points,
        fill: false,
        label: field,
        borderColor: colors[index]
      }
    })

    return selectedFields.length > 0 ? (
      <Line 
        color={'white'}
        className="Chart"
				width={200}
				height={150}
        data={{
          labels: labels,
          datasets: dataSets
        }}
			/>
    ) : null;
  }

  return (
      <div className="ChartContent">
        {renderSelectField("One")}
        {renderSelectField("Two")}
        {renderSelectField("Three")}
        {renderLineChart()}
      </div>
  )
}