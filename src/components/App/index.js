import React, { useEffect } from 'react';
import { BrowserRouter,Route,Router, Switch } from 'react-router-dom';

import FDIC from './../../containers/FDIC/fdic';
import Home from './../../containers/Home/home';
import Fitness from './../../containers/Fitness/fitness';
import News from './../../containers/News/news';

import NavBar from './navBar';

import './index.css';

export default function App(props) {

  return (
    <BrowserRouter>
      <div className='App' >
        <NavBar />        
          <div className='Application'>
            <Route exact path='/' component = { Home } />
            <Route exact path='/fdic' component = { FDIC } />
            {/* <Route exact path='/fitness' component = { Fitness } /> */}
            <Route exact path='/news' component = { News } />
          </div> 
      </div>
    </BrowserRouter>
  ) 
}