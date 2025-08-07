import React from 'react';
// import MainRouters from './routers/MainRouter';
import { Outlet, } from 'react-router-dom';
import LeftNavbar from './components/navber/Navbar';
// import YamanPage from './pages/YamanPage';

function App() {
  return (
    <div className="app-container">
      <LeftNavbar />
      <Outlet />
        {/* <RouterProvider router={MainRouters}/>  */}
    </div>
  );
}

export default App;
