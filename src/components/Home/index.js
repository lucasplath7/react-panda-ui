// NPM Packages
import React from 'react';

// Custom Modules
import Panda from './Panda';

// Styles
import './index.css';
// require('dotenv').config()

export default function Home(props) {
  return (
    <div class='HomePlaceholder'>
      <Panda />
    </div>
  );
}