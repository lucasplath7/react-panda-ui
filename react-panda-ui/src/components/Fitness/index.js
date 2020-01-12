import React, { useState } from 'react';
import {
  AppBar,
  Dialog,
  DialogTitle,
  DialogContentText,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';

import './index.css';

export default function Fitness(props) {
//   useEffect(() => {
    
//   })

  const initialState = {
    dialogOpen: false,
  };

  const [ state, setState ] = useState(initialState);

  function handleClick() {
    setState({
      ...state,
      dialogOpen: !state.dialogOpen,
    })
  }

  function renderBanner() {
    return (
      <Typography className="Banner" variant="h1" component="h1">
        D.J. FITNESS
      </Typography>
    )
  }

  function renderDialog() {
    return (
      <Dialog 
        aria-labelledby="simple-dialog-title" 
        open={state.dialogOpen}
        className="Dialog"
        onClose={handleClick}
      >
        <DialogTitle id="simple-dialog-title">// TODO //</DialogTitle>
        <DialogContentText 
          style={{
            height: '300px',
            width: '250px'
          }}
        >
          about, contact, bmr, vids
        </DialogContentText>
      </Dialog>
    );
  }

  function renderNavBar() {
    return (
      <AppBar 
        position="static"
        className="DialogBar"
      >
          <Tabs
            variant="fullWidth"
          >
            <Tab label="ABOUT" onClick={handleClick} />
            <Tab label="CONTACT" onClick={handleClick}  />
            <Tab label="BMR CALCULATOR" onClick={handleClick} />
            <Tab label="EXCERCISE VIDEOS" onClick={handleClick} />
          </Tabs>
        </AppBar>
    );
  }
  

  return (
    <div 
      class={'FitnessPlaceholder'}
    > 
      {renderDialog()}
      {renderBanner()}
      <div style={{height: '65%'}} />
      {renderNavBar()}
      <div style={{height: '10%'}} />
    </div>
  )
}