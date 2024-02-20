import Game2048 from "../games/2048/Game2048";

const GamePage = () => {
    return <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh'
      }}>
       <Game2048 />
    </div>
};


export default GamePage;