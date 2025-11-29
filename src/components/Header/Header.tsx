import { useNavigate } from "react-router-dom";
import Button from "@/common/Button/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getIsAuth, getUserName } from "@/store/selectors";
import { logout } from "@/store/user/userSlice";
import Logo from "./components/Logo/Logo";
import css from "./Header.module.scss";

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(getIsAuth);
    const userName = useAppSelector(getUserName) || "User";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        dispatch(logout());
        navigate("/login");
    };

    return (
        <header className={css.header}>
            <div className={`${css.header__container} ${css.container}`}>
                <Logo />
                <h1>find your perfect course</h1>
                {isAuth ? (
                    <div className={css.header__actions}>
                        <span className={css.header__user}>{userName}</span>
                        <Button
                            className={css.logBtn}
                            buttonText="logout"
                            onClick={handleLogout}
                        />
                    </div>
                ) : (
                    <div className={css.header__empty}></div>
                )}

            </div>
        </header>
    );
}
