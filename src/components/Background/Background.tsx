import css from "./Background.module.scss";

export default function Background() {
    return (
        <div className={css.background}>
            <span className={css.ball}></span>
            <span className={css.ball}></span>
            <span className={css.ball}></span>
            <span className={css.ball}></span>
            <span className={css.ball}></span>
            <span className={css.ball}></span>
        </div>
    );
}
