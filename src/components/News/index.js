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
import { Typography } from '../material-ui';
// import 'react-spritz/build/main.css';

const MARKS = [
  {
    value: 0,
    label: <Typography variant='body1'>FAR-LEFT</Typography>,
  },
  {
    value: 1,
    label: <Typography variant='body1'>ACTUAL-NEWS</Typography>,
  },
  {
    value: 2,
    label: <Typography variant='body1'>FAR-RIGHT</Typography>,
  }
]
const NEWS_CATEGORIES = {
  0: 'FAR-LEFT',
  1: 'LEGIT',
  2: 'FAR-RIGHT',
}

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
    setState({
      ...state,
      index: 0,
      type: NEWS_CATEGORIES[value],
    })
  }

  return (
    !props.data.newsData ?
      <div className="NewsPlaceholder">
        <CircularProgress className="Progress"></CircularProgress>
        <InputLabel>Loading News...</InputLabel>
      </div>
        :
      <div className='NewsPlaceholder'>
        <Slider
          className='Slider'
          defaultValue={1}
          aria-labelledby='discrete-slider'
          onChange={handleChange}
          valueLabelDisplay='off'
          step={1}
          marks={MARKS}
          min={0}
          max={2}
        />
        <Typography variant='body2' align='center'>
          SOURCE: {props.data.newsData.filter(i => i.leans === state.type)[state.index].sourceName}
          <br/>
          TITLE: {props.data.newsData.filter(i => i.leans === state.type)[state.index].title}
        </Typography>
        <ReactSpritz
          className='Reader'
          text={props.data.newsData.filter(i => i.leans === state.type)[state.index].article}
          wpm={wpm}
          playing={state.play}
          style={{width: '300px'}}
          normalized={true}
        />
        <Button
          onClick={handleClickPlay}
          variant='contained'
          color='primary'
        >
          <Typography variant='body1'>
            {!state.play ? 'PLAY' : 'STOP'}
          </Typography>
        </Button>
        <Button
          onClick={handleNext}
          variant='contained'
          color='secondary'
        >
          <Typography variant='body1'>
            NEXT
          </Typography>
        </Button>
        <div style={{color: 'gainsboro', display: 'flex', flexDirection: 'row'}}>
          <IconButton
            className="SlowDownButton"
            onClick={handleSlowSpeed}
            id="slowdown"
            style={{color: 'gainsboro'}}
          >
            <ArrowBackIosIcon />
          </IconButton>
           <Typography class='v-mid' variant='body1'>
              {wpm} words per minute
            </Typography>
          <IconButton
            className="SpeedUpButton"
            onClick={handleRaiseSpeed}
            style={{color: 'gainsboro'}}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      </div>
  )
}
