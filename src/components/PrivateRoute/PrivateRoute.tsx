import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { getIsAuth } from "@/store/selectors";

type PrivateRouteProps = {
    children?: JSX.Element;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const isAuth = useAppSelector(getIsAuth);

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return children ?? <Outlet />;
}
