import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ResumePage from "../pages/ResumePage";

const MainRouters = () =>{
    return <Fragment>


        <Routes>
            <Route path="/" element={<HomePage content= "Home Page" />} />
            <Route
                path="resume"
                element={<ResumePage />}
            />
            <Route path="task" element={<HomePage content= "Task Page" />} />
            <Route path="about" element={<HomePage content = "About Page" />} />
        </Routes>
    </Fragment>
};

export default MainRouters;