import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ResumePage from "../pages/ResumePage";
import GamePage from "../pages/GamePage";
import AboutPage from "../pages/AboutPage";

const MainRouters = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
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
]);

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

export default MainRouters;