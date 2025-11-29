import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@/common/Button/Button";
import { Course } from "./Course.types";
import SearchBar from "./components/SearchBar/SearchBar";
import CourseCard from "./components/CourseCard/CourseCard";
import css from "./Courses.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAuthors, getCourses, getToken } from "@/store/selectors";
import { fetchAuthors, fetchCourses } from "@/services/api";
import { setAuthors } from "@/store/authors/authorsSlice";
import { setCourses } from "@/store/courses/coursesSlice";

export default function Courses() {
    const dispatch = useAppDispatch();
    const courses = useAppSelector(getCourses);
    const authors = useAppSelector(getAuthors);
    const token = useAppSelector(getToken);

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [coursesResponse, authorsResponse] = await Promise.all([
                    fetchCourses(token),
                    fetchAuthors(token),
                ]);
                dispatch(setCourses(coursesResponse.result));
                dispatch(setAuthors(authorsResponse.result));
            } catch (error) {
                console.error("Failed to load data", error);
            }
        };

        if (!courses.length || !authors.length) {
            void loadData();
        }
    }, [authors.length, courses.length, dispatch, token]);

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
                    {filteredCourses.map(course => (
                        <li key={course.id}>
                            <CourseCard course={course} authorsList={authors} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
