// NPM Packages
import React from 'react';

// Material UI
import MUIHelpOutlineIcon from '@material-ui/icons/HelpOutline';



// Styles
import './index.css';

function HelpIcon(props) {
  return (
    <MUIHelpOutlineIcon className='HelpIcon' { ...props } />
  );
}

export {
  HelpIcon,
};