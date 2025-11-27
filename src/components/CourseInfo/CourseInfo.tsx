import { mockedAuthorsList, mockedCoursesList } from "@/constants";
import { Course } from "../Courses/Course.types";
import getCourseDuration from "@/helpers/getCourseDuration";
import formatCreationDate from "@/helpers/formatCreationDate";
import Button from "@/common/Button/Button";
import css from "./CourseInfo.module.scss";
import { Link, useParams } from "react-router-dom";

type CourseInfoProps = {
    courses?: Course[];
    authors?: { id: string; name: string }[];
};

export default function CourseInfo({
    courses = mockedCoursesList,
    authors = mockedAuthorsList,
}: CourseInfoProps) {
    const { courseId } = useParams();
    const course = courses.find((c) => c.id === courseId);

    if (!course) return <h2>Course not found</h2>;

    const authorsNames = course.authors
        .map((authorId) => {
            return (
                authors.find((a) => a.id === authorId)?.name ||
                mockedAuthorsList.find((a) => a.id === authorId)?.name
            );
        })
        .filter(Boolean)
        .join(", ");

    return (
        <section className={css.info} >
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
        </section >
    );
}
