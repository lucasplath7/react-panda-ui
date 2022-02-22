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

  // const [ state, setState ] = useState(initialState);

  // function handleSelectField(event) {
  //   setState({
  //     ...state,
  //     [event.target.name]: event.target.value,
  //   })
  // }

  // function renderOption(option) {
  //   return (
  //     <MenuItem key={option} value={option === 'NONE' ? '' : option}>
  //       { `${option}` }
  //     </MenuItem>
  //   )
  // }

  // function renderOptions(options) {
  //   return options.map(option => renderOption(option));
  // }
  
  // function renderSelectField(number) {
  //   return props.callReportData ?
  //     <div className="SelectContainer">
  //       <InputLabel style={{color: 'white'}}>Select Field</InputLabel>
  //       <Select
  //         className="Select"
  //         name={"selectedField" + number}
  //         onChange={handleSelectField}
  //         value={state["selectedField" + number]}
  //         input={
  //           <OutlinedInput name="periodDate" labelWidth={100}/>
  //         }
  //       >
  //         { renderOptions(state.allowableFields) }
  //       </Select>
  //     </div> : null;
  // }

  function renderLineChart() {
    const selectedCodes = [props.selectedCodeOne, props.selectedCodeTwo, props.selectedCodeThree].filter(value => value);
    const range = props.threeYearRange;
    const labels = range.map(date => date.id).sort((a, b) => new Date(a) - new Date(b));
    const colors = ['#26CE1E','#BD4FFC','#FCBD4F','#4FC2FC','#FC4F6C']

    const dataSets = selectedCodes.map((code, index) => {
      const points = labels.map((date) => {
        return {x: date.id, y: props.callReportData[date][code]};
      })
      return {
        data: points,
        fill: false,
        label: code,
        borderColor: colors[index]
      }
    })

    return selectedCodes.length > 0 ? (
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
        {/* {renderSelectField("One")}
        {renderSelectField("Two")}
        {renderSelectField("Three")} */}
        {renderLineChart()}
      </div>
  )
}