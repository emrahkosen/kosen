import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";

const MainRouters = () =>{
    return <Fragment>


        <Routes>
            <Route path="/" element={<HomePage content= "Home Page" />} />
            <Route
                path="resume"
                element={<HomePage content= "Resume Page" />}
            />
            <Route path="task" element={<HomePage content= "Task Page" />} />
            <Route path="about" element={<HomePage content = "About Page" />} />
        </Routes>
    </Fragment>
};

export default MainRouters;