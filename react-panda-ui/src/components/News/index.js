import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from '@material-ui/core';
import SpeedReader from 'react-speed-reader';
import ReactSpritz from 'react-spritz';


import './index.css';
import 'react-spritz/build/main.css';

const MARKS = [
  {
    value: 0,
    label: 'FAR-LEFT',
  },
  {
    value: 1,
    label: 'ACTUAL-NEWS',
  },
  {
    value: 2,
    label: 'FAR-RIGHT',
  }

]

export default function News(props) {
  useEffect(() => {
    if (!props.data.newsData && !props.data.fetchingNews) {
      props.handlers.fetchNews();
    }    
  })

  const initialState = {
    play: false,
    index: 0,
    type: 'LEGIT',
  };
  
  const [ state, setState ] = useState(initialState);

  function handleClick(event) {
    setState({
      ...state,
      play: !state.play
    })
  }

  function handleNext(event) {
    setState({
      ...state,
      index: state.index < props.data.newsData.filter(i => i.leans === state.type).length - 1 ? 
        state.index + 1 :
        0,
    })
  }

  function handleChange(event, value) {
    let type;
    if (value === 0) type = 'FAR-LEFT';
    if (value === 1) type = 'LEGIT';
    if (value === 2) type = 'FAR-RIGHT';
    setState({
      ...state,
      index: 0,
      type: type,
    })
  }

  function valuetext(value) {
    console.log('value: ', value)
    if (value === 0) return 'FAR-LEFT';
    if (value === 1) return 'ACTUAL-NEWS';
    if (value === 2) return 'FAR-RIGHT';
  }

  return (
    !props.data.newsData ?
      <div className="NewsPlaceholder">
        <CircularProgress className="Progress"></CircularProgress>
        <InputLabel style={{color: 'white'}}>Loading News...</InputLabel>
      </div>
        :
      <div className={'NewsPlaceholder'}>
        <Slider
          className="Slider"
          defaultValue={1}
          // getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          onChange={handleChange}
          valueLabelDisplay="off"
          step={1}
          marks={MARKS}
          min={0}
          max={2}
        />
        <h4>SOURCE: {props.data.newsData.filter(i => i.leans === state.type)[state.index].sourceName}</h4>
        <h4>TITLE: {props.data.newsData.filter(i => i.leans === state.type)[state.index].title}</h4>
        <ReactSpritz
          className='Reader'
          text={props.data.newsData.filter(i => i.leans === state.type)[state.index].article}
          wpm={450}
          playing={state.play}
          style={{width: '300px'}}
        />
        <Button
          onClick={handleClick}
          className='PlayButton'
        >
          {!state.play ? 'PLAY' : 'STOP'}
        </Button>
        <Button
          onClick={handleNext}
          className='PlayButton'
        >
          NEXT
        </Button>
      </div>
  )
}
