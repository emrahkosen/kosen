import React from 'react';
import Sidebar from './sidebar/Sidebar';
import MainRouters from './routers/MainRouter';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <MainRouters />
      </div>
    </div>
  );
}

export default App;
