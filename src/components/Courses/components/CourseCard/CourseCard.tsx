import { mockedAuthorsList } from "@/constants";
import { Course } from "../../Course.types";
import getCourseDuration from "@/helpers/getCourseDuration";
import formatCreationDate from "@/helpers/formatCreationDate";
import Button from "@/common/Button/Button";
import css from "./CourseCard.module.scss";
import { Link } from "react-router-dom";

type CourseCardProps = {
    course: Course;
    authorsList: { id: string; name: string }[];
};

export default function CourseCard({ course, authorsList }: CourseCardProps) {

    const authors = course.authors
        .map((author) => {
            const found =
                authorsList.find((a) => a.id === author)?.name ||
                mockedAuthorsList.find((a) => a.id === author)?.name;
            return found || author;
        })
        .filter(Boolean)
        .join(", ");

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
                </div>
            </div>
        </div>
    );
}
