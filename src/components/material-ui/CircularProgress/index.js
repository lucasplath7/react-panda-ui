// NPM Packages
import React from 'react';

// Material UI
import MUICircularProgress from '@mui/material/CircularProgress';

// Styles
import './index.css';

function CircularProgress(props) {
  return <MUICircularProgress className='CircularProgress' { ...props } />;
}

export default CircularProgress;