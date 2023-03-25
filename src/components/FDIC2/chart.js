import React from 'react';
import { Line } from 'react-chartjs-2';

// Custom Modules
import { Typography } from './../material-ui';

// import './index.css';

export default function Chart(props) {
  
  function renderLineChart() {
    const labels = props.data.dateRange
      .map(date => date.id)
      .sort((a, b) => new Date(a) - new Date(b))
    const colors = ['#26CE1E','#BD4FFC','#FCBD4F','#4FC2FC','#FC4F6C']

    const dataSets = props.data.selectedCodes.map((code, index) => {
      const points = labels.map((date) => {
        return {x: date, y: +props.data.callReportData[date][code]};
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
          gridLines: {
            color: '#717171',
            // drawBorder: false,
            tickMarkLength: 10,
            // zeroLineWidth: 0,
            lineWidth: .5,
          }
        }],
      xAxes: [{
        ticks: {
          fontColor: 'gainsboro'
        },
        gridLines: {
          color: '#717171',
          // drawBorder: false,
          tickMarkLength: 10,
          // zeroLineWidth: 0,
          lineWidth: .5,
        }
      }],
    } 
    }

    return props.data.selectedCodes.length > 0 ? (
      <Line 
        color={'red'}
        className="Chart"
				width={200}
				height={150}
        data={{
          labels: labels,
          datasets: dataSets
        }}
        options={options}
        // style={{color: 'white'}}
			/>
    ) : null;
  }

  return (
      <div className="ChartContent">
        {renderLineChart()}
      </div>
  )
}