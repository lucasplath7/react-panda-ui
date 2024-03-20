// NPM Packages
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

// Custom Modules
import FDIC from './../../containers/FDIC/fdic'
import Home from './../../containers/Home/home';
import News from './../../containers/News/news';
import NavBar from './navBar';

// Styles
import './index.css';
import { theme } from '../material-ui';

export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className='App' >
          <NavBar />        
          <div className='Content'>
            <Route exact path='/' component = { Home } />
            <Route exact path='/fdic' component = { FDIC } />
            <Route exact path='/news' component = { News } />
          </div> 
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}