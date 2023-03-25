// NPM Packages
import React from 'react';

// Material UI
import MUISelect from '@mui/material/Select';

// Styles
import './index.css';

function Select(props) {
  return (
    <MUISelect className='Select' { ...props } >
      {/* {...props.children} */}
    </MUISelect>
  );
}

export default Select;