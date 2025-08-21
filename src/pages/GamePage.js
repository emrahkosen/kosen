import { Outlet } from "react-router-dom";

const GamePage = () => {
    return <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh'
      }}>
       <Outlet />
    </div>
};


export default GamePage;