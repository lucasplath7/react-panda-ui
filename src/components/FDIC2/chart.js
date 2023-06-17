import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

// Custom Modules
import { Typography } from './../material-ui';

export default function Chart(props) {

  const [placeHolderHidden, setPlaceholderHidden] = useState(false);

  document.addEventListener('animationend', (e) => {
    if (e.animationName === 'reveal_placeholder') {
      setPlaceholderHidden(false);
    }
    if (e.animationName === 'hide_placeholder') {
      setPlaceholderHidden(true);
    }
  })
  
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

  function renderPlaceholder() {
    const placeHolderClassName = props.data.selectedCodes.length === 0 ? 'reveal' : (placeHolderHidden ? 'hidden' : 'hide');
    const gridBlock = <div className='place-block'/>;
    const gridRow = <div className='place-row'>{ new Array(12).fill(gridBlock) }</div>;
    const gridRows = (
      <div className={`place-grid ${placeHolderClassName}`} id='place-grid'>
        { new Array(12).fill(gridRow) }
        <Typography variant='h2' className='no-data-text'>
          NO DATA
        </Typography>
        </div> 
    );
    return gridRows;
  }

  return (
      <div className="ChartContent">
        {props.data.selectedCodes.length > 0 && placeHolderHidden ? renderLineChart() : renderPlaceholder()}
      </div>
  )
}