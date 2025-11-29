import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Background from "./components/Background/Background";
import Courses from "./components/Courses/Courses";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import CreateCourse from "./components/CreateCourse/CreateCourse";
import Registration from "./components/Registration/Registration";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { useAppSelector } from "./store/hooks";
import { getIsAuth } from "./store/selectors";

function InnerApp() {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuth = useAppSelector(getIsAuth);

    useEffect(() => {
        if (
            isAuth &&
            (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/registration")
        ) {
            navigate("/courses", { replace: true });
        }
    }, [isAuth, location.pathname, navigate]);

    return (
        <>
            <Background />
            <Header />

            <Routes>
                <Route path="/" element={<Navigate to={isAuth ? "/courses" : "/login"} replace />} />

                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />

                <Route element={<PrivateRoute />}>
                    <Route path="/courses" element={<Courses />} />

                    <Route path="/courses/:courseId" element={<CourseInfo />} />

                    <Route path="/courses/add" element={<CreateCourse />} />
                </Route>

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <InnerApp />
        </BrowserRouter>
    );
}
