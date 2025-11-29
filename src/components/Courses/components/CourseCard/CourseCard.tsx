import { Link } from "react-router-dom";
import Button from "@/common/Button/Button";
import getCourseDuration from "@/helpers/getCourseDuration";
import formatCreationDate from "@/helpers/formatCreationDate";
import { useAppDispatch } from "@/store/hooks";
import { deleteCourse } from "@/store/courses/coursesSlice";
import { Course } from "../../Course.types";
import css from "./CourseCard.module.scss";

type CourseCardProps = {
    course: Course;
    authorsList: { id: string; name: string }[];
};

export default function CourseCard({ course, authorsList }: CourseCardProps) {
    const dispatch = useAppDispatch();

    const authors = course.authors
        .map(author => {
            const found = authorsList.find(a => a.id === author)?.name;
            return found || author;
        })
        .filter(Boolean)
        .join(", ");

    const handleDelete = () => {
        dispatch(deleteCourse(course.id));
    };

    return (
        <div className={css.card}>
            <h2 className={css.card__title}>{course.title}</h2>
            <div className={css.card__flex}>
                <p className={css.card__text}>{course.description}</p>
                <div className={css.card__details}>
                    <ul>
                        <li>
                            <p>Authors: <span className={css.card__authors}>{authors}</span></p>
                        </li>
                        <li>
                            <p>Duration: <span>{getCourseDuration(course.duration)}</span></p>
                        </li>
                        <li>
                            <p>Created: <span>{formatCreationDate(course.creationDate)}</span></p>
                        </li>
                    </ul>
                    <Link to={`/courses/${course.id}`} style={{ display: "inline-block" }}>
                        <Button className={css.showBtn} buttonText="show course" />
                    </Link>
                    <div className={css.card__actions}>
                        <Button className={css.showBtn} buttonText="delete course" onClick={handleDelete} />
                        <Button className={css.showBtn} buttonText="update course" type="button" />
                    </div>
                </div>
            </div>
        </div>
    );
}
