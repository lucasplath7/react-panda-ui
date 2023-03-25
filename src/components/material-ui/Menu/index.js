// NPM Packages
import React from 'react';

// Material UI
import MUIMenu from '@mui/material/Menu';
import MUIMenuItem from '@mui/material/MenuItem';
import MUIMenuList from '@mui/material/MenuList';

// Styles
import './index.css';

function Menu(props) {
  return (
    <MUIMenu className='Menu' { ...props } >
      {/* {...props.children} */}
    </MUIMenu>
  );
}

function MenuItem(props) {
  return (
    <MUIMenuItem className='MenuItem' { ...props } >
      {/* {...props.children} */}
    </MUIMenuItem>
  );
}

function MenuList(props) {
  return (
    <MUIMenuList className='MenuList' { ...props } >
      {/* {...props.children} */}
    </MUIMenuList>
  );
}

export {
  Menu,
  MenuItem,
  MenuList
};