import React, { useEffect } from 'react';
import { BrowserRouter,Route,Router, Switch, Link } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import FDIC from './../../containers/FDIC/fdic';
import FDIC2 from './../../containers/FDIC2/fdic'
import Home from './../../containers/Home/home';
import Fitness from './../../containers/Fitness/fitness';
import News from './../../containers/News/news';

import NavBar from './navBar';

import './index.css';
import { theme } from '../material-ui';

export default function App(props) {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className='App' >
          <NavBar />        
            <div className='Application'>
              <Route exact path='/' component = { Home } />
              <Route exact path='/fdic' component = { FDIC2 } />
              {/* <Route exact path='/fitness' component = { Fitness } /> */}
              <Route exact path='/news' component = { News } />
            </div> 
        </div>
      </BrowserRouter>
    </ThemeProvider>
  ) 
}