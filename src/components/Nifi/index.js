// NPM Packages
import React, { useEffect, useState } from 'react';

// Styles
import './index.css'

export default function News(props) {
  return (
      <iframe className='nifi-frame' src='http://192.168.1.154:8080/nifi/' title='nifi-demo' sandbox></iframe>
    //   <ReactIframe
    //   className='nifi-frame'
    //   url="http://192.168.1.154:8080/nifi/"
    //   // width="500px"
    //   // height="300px"
    // />
    
  )
}