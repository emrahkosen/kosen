// import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ResumePage from "../pages/ResumePage";
import GamePage from "../pages/GamePage";
import AboutPage from "../pages/AboutPage";
import YamanPage from "../pages/YamanPage";

// const MainRouters = createBrowserRouter([
//     {
//         path: "/",
//         element: <HomePage />
//     },
//     {
//         path: "resume",
//         element: <ResumePage />
//     },
//     {
//         path: "task",
//         element: <HomePage content= "Task Page"/>
//     },
//     {
//         path: "about",
//         element: <AboutPage />
//     },
//     {
//         path: "games",
//         element: <GamePage />
//     },
//     {
//         path: "yaman",
//         element: <YamanPage />
//     },
// ]);

// () =>{
//     return <Fragment>


//         <Routes>
//             <Route path="/" element={<HomePage content= "Home Page" />} />
//             <Route
//                 path="resume"
//                 element={<ResumePage />}
//             />
//             <Route path="task" element={<HomePage content= "Task Page" />} />
//             <Route path="about" element={<HomePage content = "About Page" />} />
//         </Routes>
//     </Fragment>
// };


// src/router.jsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import NotFoundPage from '../pages/NotFoundPage';
import Game2048 from "../games/2048/Game2048";
import CandyCrush from "../games/CandyCruch";
import GameHomePage from "../games/2048/GameHomePage";
import ReflexRush from "../games/ReflexRush";



export const MainRouters = createBrowserRouter([
    
    {
        path: '/',
        element: <App />,
        errorElement: <NotFoundPage />, 
        children: [
          {
            index: true, // path: '/'
            element: <HomePage />,
          },
        {
            path: "resume",
            element: <ResumePage />
        },
        {
            path: "task",
            element: <HomePage content= "Task Page"/>
        },
        {
            path: "about",
            element: <AboutPage />
        },
        {
          path: "games",
          element: <GamePage />,
          children: [
            {
              // This index route will render when the user navigates to "/games"
              index: true,
              // You can replace this with a component that lists all games.
              element: <GameHomePage />
            },
            {
              path: '2048', 
              element: <Game2048 /> 
            },
            {
              path: 'candy', 
              element: <CandyCrush /> 
            },
            {
              path: 'rush', 
              element: <ReflexRush /> 
            }
          ]
        },
        ],
      },
  {
    // 2. Bağımsız Sayfa (Layout kullanmayan)
    // Bu yolun kendi elementi var ve bir üst düzeni yok
    path: '/yaman',
    element: <YamanPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
//   {
//     path: '*',
//     element: <NotFoundPage />,
//   }
]);

export default MainRouters;