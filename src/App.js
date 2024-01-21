import React from 'react';
import Sidebar from './sidebar/Sidebar';
import HomePage from './pages/HomePage';
import MainRouters from './routers/MainRouter';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <HomePage> <h1>Home</h1></HomePage>
        <MainRouters />
      </div>
    </div>
  );
}

export default App;
