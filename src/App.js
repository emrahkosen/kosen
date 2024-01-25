import React from 'react';
import Sidebar from './components/sidebar/Sidebar';
import MainRouters from './routers/MainRouter';
import { RouterProvider } from 'react-router-dom';
import LeftNavbar from './components/navber/Navbar';

function App() {
  return (
    <div className="app-container">
      {/* <Sidebar /> */}
      <LeftNavbar />
      <div className="main-content">
        <RouterProvider router={MainRouters}/>
      </div>
    </div>
  );
}

export default App;
