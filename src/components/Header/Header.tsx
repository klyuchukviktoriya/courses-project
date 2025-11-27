import Button from "@/common/Button/Button";
import Logo from "./components/Logo/Logo";
import css from "./Header.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

type HeaderProps = {
    userName?: string;
    isAuth?: boolean;
    onLogout?: () => void;
};

export default function Header({ userName, isAuth, onLogout }: HeaderProps) {
    useLocation(); // keep hook usage for router context
    const navigate = useNavigate();

    const storedToken = localStorage.getItem("token");
    const storedName = localStorage.getItem("user") || localStorage.getItem("userName") || "";
    const authenticated = typeof isAuth === "boolean" ? isAuth : Boolean(storedToken);
    const displayName = (userName ?? storedName) || "User";
    const showAuth = authenticated;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("user");
        if (onLogout) {
            onLogout();
        }
        navigate("/login");
    };

    return (
        <header className={css.header}>
            <div className={`${css.header__container} ${css.container}`}>
                <Logo />
                <h1>find your perfect course</h1>
                {showAuth && (
                    <div className={css.header__actions}>
                        <span className={css.header__user}>{displayName}</span>
                        <Button
                            className={css.logBtn}
                            buttonText="logout"
                            onClick={handleLogout}
                        />
                    </div>
                )}
            </div>
        </header>
    );
}
