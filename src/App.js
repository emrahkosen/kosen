import React from 'react';
import Sidebar from './components/sidebar/Sidebar';
import MainRouters from './routers/MainRouter';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <RouterProvider router={MainRouters}/>
      </div>
    </div>
  );
}

export default App;
