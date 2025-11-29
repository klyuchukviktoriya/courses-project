import css from "./Logo.module.scss";

export default function Logo() {
    return (
        <div className={css.logo}>
            <img className={css.logo__img} src="/src/assets/logo.png" alt="logoFYPC" />
        </div>
    );
}
