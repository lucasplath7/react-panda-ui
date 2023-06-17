// NPM Packages
import React from 'react';

// Material UI
import MUIDialog from '@mui/material/Dialog';
import MUIDialogTitle from '@mui/material/DialogTitle';


// Styles
import './index.css';

function DialogTitle(props) {
  return (
    <MUIDialogTitle className='DialogTitle' { ...props } />
  );
}

function Dialog(props) {
  return (
    <MUIDialog className='MenuDialog' { ...props } />
  );
}

export {
  DialogTitle,
  Dialog,
};