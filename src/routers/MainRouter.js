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



export const MainRouters = createBrowserRouter([
    
    {
        // 1. Ana Düzen (Layout) ile olan sayfalar
        // Bu path altındaki tüm yollar MainLayout bileşenini kullanacak
        path: '/',
        element: <App />,
        errorElement: <NotFoundPage />, // Bu grup için hata sayfası
        children: [
          {
            index: true, // path: '/' ile eşleştiğinde bu render edilir
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
            element: <GamePage />
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