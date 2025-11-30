import { Link, useParams } from "react-router-dom";
import Button from "@/common/Button/Button";
import getCourseDuration from "@/helpers/getCourseDuration";
import formatCreationDate from "@/helpers/formatCreationDate";
import { useAppSelector } from "@/store/hooks";
import { getAuthors, getCourses } from "@/store/selectors";
import css from "./CourseInfo.module.scss";
import EmptyCourseList from "../EmptyCourseList/EmptyCourseList";

export default function CourseInfo() {
    const { courseId } = useParams();
    const courses = useAppSelector(getCourses);
    const authors = useAppSelector(getAuthors);
    const course = courses.find(c => c.id === courseId);

    if (!course) return <EmptyCourseList />;

    const authorsNames = course.authors
        .map(authorId => authors.find(a => a.id === authorId)?.name)
        .filter(Boolean)
        .join(", ");

    return (
        <section className={css.info}>
            <div className={`${css.container} ${css.info__container}`}>
                <h2 className={css.info__title}>{course.title}</h2>
                <div className={css.info__div}>
                    <h2 className={css.info__header}>Description:</h2>
                    <div className={css.info__flex}>
                        <p className={css.info__text}>{course.description}</p>
                        <table className={css.info__table}>
                            <tbody>
                                <tr>
                                    <td>ID:</td>
                                    <td>{course.id}</td>
                                </tr>
                                <tr>
                                    <td>Duration:</td>
                                    <td>{getCourseDuration(course.duration)}</td>
                                </tr>
                                <tr>
                                    <td>Created:</td>
                                    <td>{formatCreationDate(course.creationDate)}</td>
                                </tr>
                                <tr>
                                    <td>Authors:</td>
                                    <td><span className={css.info__authors}>{authorsNames}</span></td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
                <Link className={css.backLink} to="/courses">
                    <Button className={css.backBtn} buttonText="back" />
                </Link>
            </div>
        </section>
    );
}
