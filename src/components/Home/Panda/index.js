// NPM Packages
import React from 'react';
import { useEffect } from 'react';

// Styles
import './index.css';

export default function Panda() {
  // Hooks
  useEffect(() => {
    const pupils = document.querySelectorAll('.pupil');

    window.addEventListener('mousemove', (e) => {
      pupils.forEach((pupil) => {
        const rect = pupil.getBoundingClientRect();
        const x = `${(e.pageX - rect.left) / 110}px`;
        const y = `${(e.pageY - rect.top) / 70}px`;
        pupil.style.transform = `translate3d(${x},${y},0px)`;
      });
    });
  });

  return (
    <div className='panda'>
      <div className='ears'>
        <div className='ear ear-lft' />
        <div className='ear ear-rgt' />
      </div>
      <div className='face'>
        <div className='eyes'>
          <div className='eye-shadow eye-shadow-lft'>
            <div className='eye-wht eye-wht-lft'>
              <div className='pupil' />
            </div>
          </div>
          <div className='eye-shadow eye-shadow-rgt'>
            <div className='eye-wht eye-wht-rgt'>
              <div className='pupil' />
            </div>
          </div>
          <div className='nose' />
        </div>
      </div>
    </div>
  );
}
