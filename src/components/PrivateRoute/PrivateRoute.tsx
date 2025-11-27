import { Navigate, Outlet } from "react-router-dom";

type PrivateRouteProps = {
    children?: JSX.Element;
};

// If token is present, render protected content; otherwise redirect to login
export default function PrivateRoute({ children }: PrivateRouteProps) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children ?? <Outlet />;
}
