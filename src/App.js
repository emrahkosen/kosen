import React from 'react';
import MainRouters from './routers/MainRouter';
import { RouterProvider } from 'react-router-dom';
import LeftNavbar from './components/navber/Navbar';

function App() {
  return (
    <div className="app-container">
      <LeftNavbar />
        <RouterProvider router={MainRouters}/>
    </div>
  );
}

export default App;
