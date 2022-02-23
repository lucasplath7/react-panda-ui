import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function NavBar() {
    return (
      <div className={'NavBar'}>
        <AppBar position="static">
          <Tabs
            variant="fullWidth"
          >
            <Tab label="HOME" href="/" to="/"   />
            <Tab label="FDIC" href="/fdic" to="/fdic"  />
            {/* <Tab label="FITNESS" href="/fitness" to="/fitness" /> */}
            <Tab label="NEWS" href="/news"  to="/news" />
          </Tabs>
        </AppBar>
      </div>
    );
}