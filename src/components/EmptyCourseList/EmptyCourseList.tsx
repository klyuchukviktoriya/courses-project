import Button from "@/common/Button/Button";
import css from "./EmptyCourseList.module.scss";
import { Link } from "react-router-dom";

export default function EmptyCourseList() {
    return (
        <section className={css.empty}>
            <div className={`${css.container} ${css.empty__container}`}>
                <h2 className={css.empty__title}>Course List is Empty</h2>
                <p className={css.empty__text}>Please use "Add New Course" button to add your first course</p>
                <Link to="/courses/add">
                    <Button className={css.addBtn} buttonText="add new course" />
                </Link>
            </div>
        </section>
    );
}
