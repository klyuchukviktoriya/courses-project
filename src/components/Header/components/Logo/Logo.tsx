import css from "./Logo.module.scss";

export default function Logo() {
    return (
        <div className={css.logo}>
            <img src="/src/assets/logo.png" alt="logoFYPC" />
        </div>
    );
}
