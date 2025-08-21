import React from 'react';
import { Outlet, } from 'react-router-dom';
import LeftNavbar from './components/navber/Navbar';

function App() {
  return (
    <div className="app-container">
      <LeftNavbar />
      <Outlet />
    </div>
  );
}

export default App;
