import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';


import './index.css';

export default function Chart(props) {

  // useEffect(() => {
   
  // })

  // const [ state, setState ] = useState(initialState);

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

    const options = {
      legend: {
        labels: {
          fontColor: 'gainsboro'
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: 'gainsboro'
          },
        }],
      xAxes: [{
        ticks: {
          fontColor: 'gainsboro'
        },
      }]
    } 
    }

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
        options={options}
        style={{color: 'white'}}
			/>
    ) : null;
  }

  return (
      <div className="ChartContent">
        {renderLineChart()}
      </div>
  )
}