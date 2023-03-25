// NPM Packages
import React from 'react';

// Material UI
import MUIInputLabel from '@mui/material/InputLabel';
import MUIOutlinedInput from '@mui/material/OutlinedInput';

// Styles
import './index.css';

function InputLabel(props) {
  return (
    <MUIInputLabel className='InputLabel' { ...props }>
      {/* { ...props.children } */}
    </MUIInputLabel>
  )
}

function OutlinedInput(props) {
  return <MUIOutlinedInput className='OutlinedInput' { ...props } />
}

export {
  InputLabel,
  OutlinedInput,
};