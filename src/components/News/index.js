import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  InputLabel,
  Slider,
} from '@material-ui/core';
import SpeedRead from 'speed-read-v1';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';

// import ReactSpritz from './react-spritz-custom';

import './index.css';
import {
  Typography,
  Radio,
  Dialog,
  DialogTitle,
  HelpIcon,
} from '../material-ui';
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
      window.addEventListener('resize', () => {
          const ismobile = window.innerWidth < 600;
          if (ismobile !== isMobile) setIsMobile(ismobile);
      }, false);
  }, [isMobile]);

  useEffect(() => {
    if (!props.data.newsData && !props.data.fetchingNews && !props.data.error) {
      props.handlers.fetchNews();
    }
  });

  const initialState = {
    play: false,
    index: 0,
    type: 'LEGIT',
    wpm: 450,
    mobile: window.innerWidth <= 600,
  };
  
  const [ state, setState ] = useState(initialState);
  const [ wpm, setWPM] = useState(450);
  const [ infoDialogOpen, setInfoDialogOpen ] = useState(false);

  function handleClickPlay(event) {
    setState({
      ...state,
      wpm: wpm,
      play: !state.play,
      mobile: false,
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
    console.log('value: ', value)    
    setState({
      ...state,
      index: 0,
      type: NEWS_CATEGORIES[value],
    })
  }

  function renderSlider() {
    return (
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
    )
  }

  function renderRadios() {
    return (
      <RadioGroup
        defaultValue={1}
        name="radio-buttons-group"
        onChange={handleChange}
        row
      >
        <FormControlLabel value={0} control={<Radio color='secondary'/>} labelPlacement='bottom' label='L' />
        <FormControlLabel value={1} control={<Radio color='info'/>} labelPlacement='bottom' label='C' />
        <FormControlLabel value={2} control={<Radio color='error' />} labelPlacement='bottom' label='R' />
      </RadioGroup>
    )
  }

  function renderHelpIcon() {
    return (
      <HelpIcon
        className='news-info-icon'
        onClick={() => setInfoDialogOpen(true)}
      />
    )
  }

  function renderInfoDialog() {
    return (
      <Dialog open={infoDialogOpen} onClose={() => setInfoDialogOpen(false)}>
        <DialogTitle>ABOUT NEWS SPEED READER</DialogTitle>
        <div style={{padding: '20px'}}>
          <Typography align='left' className='info-text'>
            <b>Description:</b> This is a POC to demonstrate news data scraping fed into
            a speed reading module inspired by Swerp. It is a news reading experiment to 
            optimize the user's ability to quickly absorb information from less legitimate
            sources and compare against reputable ones. In the world of free news, the only
            way to get an idea of the actual facts in major stories is to synthesize what is
            reported from a broad spectrum and filter out the factual information from the
            textbook logical fallacies.
            <b>NPM Package:</b>
          </Typography>
          <Typography align='left' className='info-text'>
            <b>NPM Package:</b>{' '}
            <a href='https://www.npmjs.com/package/speed-read-v1' target='_blank'>
              speed-read-v1
            </a>
          </Typography>
        </div>
      </Dialog>
    )
  }

  return (
    !props.data.newsData ?
      <div className="NewsPlaceholder">
        <CircularProgress className="Progress"></CircularProgress>
        <InputLabel>Loading News...</InputLabel>
      </div>
        :
      <>
        <div>
          {renderHelpIcon()}
          {renderInfoDialog()}
        </div>
        <div className='NewsPlaceholder'>
          { !isMobile ? renderSlider() : renderRadios() }
          <div className='source-info'>
            <Typography variant='body1' align='center'>
              SOURCE: {props.data.newsData.filter(i => i.leans === state.type)[state.index].sourceName}
            </Typography>
            <Typography variant='body2' align='center'>
              TITLE: {props.data.newsData.filter(i => i.leans === state.type)[state.index].title}
            </Typography>
          </div>
          <SpeedRead
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
      </>
  )
}
