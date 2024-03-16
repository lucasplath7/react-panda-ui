// NPM Packages
import React from 'react';

// Material UI
import MUIRadio from '@mui/material/Radio';

// Styles
import './index.css';

function Radio(props) {
  return (
    <MUIRadio className='Radio' { ...props } >
      {/* {...props.children} */}
    </MUIRadio>
  );
}

export default Radio;