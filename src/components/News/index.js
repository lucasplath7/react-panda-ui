import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  InputLabel,
  Slider,
} from '@material-ui/core';
// import ReactSpritz from 'react-spritz';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';

import ReactSpritz from './react-spritz-custom';

import './index.css';
// import 'react-spritz/build/main.css';

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
    wpm: 450,
  };
  
  const [ state, setState ] = useState(initialState);
  const [ wpm, setWPM] = useState(450);
console.log('state: ', state)
console.log('wpm: ', wpm)
  function handleClickPlay(event) {
    setState({
      ...state,
      wpm: wpm,
      play: !state.play,
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

  function handleSlowSpeed(event) {
    setWPM(wpm - 50);
  }

  function handleRaiseSpeed(event) {
    setWPM(wpm + 50);
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
          wpm={wpm}
          playing={state.play}
          style={{width: '300px'}}
        />
        <Button
          onClick={handleClickPlay}
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
        <div style={{color: 'white'}}>
          <IconButton
            className="SlowDownButton"
            onClick={handleSlowSpeed}
            id="slowdown"
            style={{color: 'white'}}
          >
            <ArrowBackIosIcon />
          </IconButton>
            {wpm} words per minute
          <IconButton
            className="SpeedUpButton"
            onClick={handleRaiseSpeed}
            style={{color: 'white'}}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      </div>
  )
}
