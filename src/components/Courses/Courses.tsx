import Button from "@/common/Button/Button";
import { Course } from "./Course.types";
import SearchBar from "./components/SearchBar/SearchBar";
import CourseCard from "./components/CourseCard/CourseCard";
import css from "./Courses.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { mockedAuthorsList, mockedCoursesList } from "@/constants";

type CoursesProps = {
    courses?: Course[];
    authors?: { id: string; name: string }[];
};

export default function Courses({
    courses = mockedCoursesList,
    authors = mockedAuthorsList,
}: CoursesProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

    const filterCourses = useMemo(
        () => (list: Course[], query: string) => {
            const term = query.trim().toLowerCase();
            if (!term) return list;
            return list.filter(course => {
                const matchesTitle = course.title.toLowerCase().includes(term);
                const matchesId = course.id.toLowerCase().includes(term);
                const matchesAuthor = course.authors.some(authorId => {
                    const authorName = authors.find(a => a.id === authorId)?.name?.toLowerCase();
                    return authorName ? authorName.includes(term) : false;
                });
                return matchesTitle || matchesId || matchesAuthor;
            });
        },
        [authors]
    );

    useEffect(() => {
        setFilteredCourses(filterCourses(courses, searchQuery));
    }, [courses, filterCourses, searchQuery]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setFilteredCourses(filterCourses(courses, query));
    };

    return (
        <section className={css.coursesPage}>
            <div className={`${css.container} ${css.coursesPage__container}`}>
                <div className={css.coursesPage__bar}>
                    <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
                    <Link to="/courses/add">
                        <Button className={css.addBtn} buttonText="create course" />
                    </Link>
                </div>

                <ul className={css.coursesList}>
                    {filteredCourses.map((course) => (
                        <li key={course.id}>
                            <CourseCard course={course} authorsList={authors} />
                        </li>
                    ))}
                </ul>

            </div>
        </section>
    );
}
