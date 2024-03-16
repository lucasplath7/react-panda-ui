import React from 'react';

import Panda from './Panda';

import './index.css';
require('dotenv').config()

export default function Home(props) {
  return (
    <div class='HomePlaceholder'>
      <Panda />
    </div>
  )
}