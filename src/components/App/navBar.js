import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import {
  Menu,
  MenuItem,
  Tabs,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

import './index.css'

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={'NavBar'}>
      <AppBar position='static'>
        <MenuIcon sx={{ mr: 2, display: { sm: 'none' } }} onClick={handleClick} className='menu-icon' />
        <Menu
          class='nav-menu'
          id='nav-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} component='a' href='/' >HOME</MenuItem>
          <MenuItem onClick={handleClose} component='a' href='/fdic'>FDIC</MenuItem>
          <MenuItem onClick={handleClose} component='a' href='/news'>NEWS</MenuItem>
        </Menu>
        <Tabs
          variant='fullWidth'
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          <Tab label='HOME' href='/' to='/'   />
          <Tab label='FDIC' href='/fdic' to='/fdic'  />
          <Tab label='NEWS' href='/news'  to='/news' />
        </Tabs>
      </AppBar>
    </div>
  );
}
