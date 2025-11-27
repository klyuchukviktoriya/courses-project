import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Background from "./components/Background/Background";
import Courses from "./components/Courses/Courses";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import CreateCourse from "./components/CreateCourse/CreateCourse";
import { mockedAuthorsList, mockedCoursesList } from "./constants";
import { useEffect, useState } from "react";
import { Course } from "./components/Courses/Course.types";
import Registration from "./components/Registration/Registration";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function InnerApp() {
  const navigate = useNavigate();
  const location = useLocation();

  const [courses, setCourses] = useState<Course[]>(mockedCoursesList);
  const [authors, setAuthors] = useState(mockedAuthorsList);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [userName, setUserName] = useState<string>(() => localStorage.getItem("userName") || "");

  useEffect(() => {
    if (
      token &&
      (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/registration")
    ) {
      navigate("/courses", { replace: true });
    }
  }, [location.pathname, navigate, token]);

  const handleAddCourse = (
    newCourse: Course,
    newAuthors: { id: string; name: string }[]
  ) => {
    setCourses(prev => [...prev, newCourse]);
    setAuthors(prev => [...prev, ...newAuthors]);
    navigate("/courses");
  };

  const handleLoginSuccess = (tokenValue: string, nameValue: string) => {
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("userName", nameValue);
    setToken(tokenValue);
    setUserName(nameValue);
    navigate("/courses", { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setToken(null);
    setUserName("");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <Background />
      <Header
        userName={userName}
        isAuth={Boolean(token)}
        onLogout={handleLogout}
      />

      <Routes>
        <Route
          path="/"
          element={<Navigate to={token ? "/courses" : "/login"} replace />}
        />

        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/registration" element={<Registration />} />

        <Route element={<PrivateRoute />}>
          <Route path="/courses" element={<Courses courses={courses} authors={authors} />} />

          <Route path="/courses/:courseId"
            element={<CourseInfo courses={courses} authors={authors} />}
          />

          <Route
            path="/courses/add"
            element={
              <CreateCourse
                onCreateCourse={handleAddCourse}
                onCancel={() => navigate("/courses")}
              />
            }
          />
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
