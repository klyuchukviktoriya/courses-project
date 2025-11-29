import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/common/Input/Input";
import getCourseDuration from "@/helpers/getCourseDuration";
import AuthorItem from "../AuthorItem/AuthorItem";
import Button from "@/common/Button/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addAuthor, setAuthors } from "@/store/authors/authorsSlice";
import { addCourse } from "@/store/courses/coursesSlice";
import { getAuthors, getToken } from "@/store/selectors";
import { fetchAuthors } from "@/services/api";
import css from "./CreateCourse.module.scss";
import { Course } from "../Courses/Course.types";

export default function CreateCourse() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authorsFromStore = useAppSelector(getAuthors);
    const token = useAppSelector(getToken);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [availableAuthors, setAvailableAuthors] = useState(authorsFromStore);
    const [courseAuthors, setCourseAuthors] = useState<{ id: string; name: string }[]>([]);
    const [newAuthorName, setNewAuthorName] = useState("");
    const [errors, setErrors] = useState<{
        title?: string;
        description?: string;
        duration?: string;
        authorName?: string;
    }>({});

    useEffect(() => {
        const loadAuthors = async () => {
            try {
                const response = await fetchAuthors(token);
                dispatch(setAuthors(response.result));
            } catch (error) {
                console.error("Failed to load authors", error);
            }
        };

        if (!authorsFromStore.length) {
            void loadAuthors();
        }
    }, [authorsFromStore.length, dispatch, token]);

    useEffect(() => {
        const courseAuthorIds = new Set(courseAuthors.map(a => a.id));
        setAvailableAuthors(authorsFromStore.filter(a => !courseAuthorIds.has(a.id)));
    }, [authorsFromStore, courseAuthors]);

    const generateId = () => Math.random().toString(36).slice(2, 10);

    const handleCreateAuthor = () => {
        if (newAuthorName.trim().length < 2) {
            setErrors(prev => ({
                ...prev,
                authorName: "Author name must be at least 2 characters",
            }));
            return;
        }

        const newAuthor = { id: generateId(), name: newAuthorName.trim() };
        dispatch(addAuthor(newAuthor));
        setNewAuthorName("");
        setErrors(prev => ({ ...prev, authorName: "" }));
    };

    const handleAddAuthor = (id: string) => {
        const author = availableAuthors.find(a => a.id === id);
        if (!author) return;
        setCourseAuthors(prev => [...prev, author]);
    };

    const handleDeleteAuthor = (id: string) => {
        setCourseAuthors(prev => prev.filter(a => a.id !== id));
    };

    const handleCreateCourse = () => {
        const newErrors: typeof errors = {};
        if (!title.trim()) newErrors.title = "Required";
        if (!description.trim()) newErrors.description = "Required";
        if (!duration.trim() || Number(duration) <= 0) newErrors.duration = "Invalid duration";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        const newCourse: Course = {
            id: generateId(),
            title,
            description,
            creationDate: new Date().toISOString(),
            duration: Number(duration),
            authors: courseAuthors.map(a => a.id),
        };

        dispatch(addCourse(newCourse));
        navigate("/courses");

        setTitle("");
        setDescription("");
        setDuration("");
        setCourseAuthors([]);
        setNewAuthorName("");
    };

    const courseDuration = useMemo(() => getCourseDuration(Number(duration)), [duration]);

    return (
        <section className={css.create}>
            <div className={`${css.create__container} ${css.container}`}>
                <h2>Course Edit / Create Page</h2>
                <div className={css.create__wrapper}>
                    <h3>Main Info</h3>
                    <form
                        className={css.create__form}
                        onSubmit={e => {
                            e.preventDefault();
                            handleCreateCourse();
                        }}>
                        <div>
                            <Input
                                labelText="Title"
                                onChange={e => setTitle(e.target.value)}
                                placeholderText="Title"
                                id="title"
                                inputType="text"
                                errorMessage={errors.title}
                                value={title}
                            />
                            <Input
                                labelText="Description"
                                onChange={e => setDescription(e.target.value)}
                                placeholderText="Description"
                                id="description"
                                inputType="textarea"
                                errorMessage={errors.description}
                                value={description}
                            />

                        </div>

                        <div>
                            <h3>Duration</h3>
                            <div className={css.create__duration}>
                                <Input
                                    labelText="Duration (min)"
                                    onChange={e => setDuration(e.target.value.replace(/\D/g, ""))}
                                    placeholderText="Duration"
                                    id="duration"
                                    inputType="text"
                                    errorMessage={errors.duration}
                                    value={duration}
                                />
                                <p>{courseDuration}</p>
                            </div>

                        </div>

                        <div>
                            <h3>Authors</h3>
                            <div className={css.create__authorsDiv}>
                                <div className={css.create__createAuthors}>
                                    <Input
                                        labelText="Author Name"
                                        onChange={e => setNewAuthorName(e.target.value)}
                                        placeholderText="Author Name"
                                        id="authorName"
                                        inputType="text"
                                        value={newAuthorName}
                                        errorMessage={errors.authorName}
                                    />

                                    <Button
                                        className={css.create__btn}
                                        buttonText="Create author"
                                        type="button"
                                        onClick={handleCreateAuthor}
                                    />
                                </div>

                                <div>
                                    <h4>Authors List</h4>
                                    {availableAuthors.length > 0 ? (
                                        availableAuthors.map(author => (
                                            <AuthorItem
                                                key={author.id}
                                                author={author}
                                                buttonText="Add author"
                                                onButtonClick={handleAddAuthor}
                                            />
                                        ))
                                    ) : (
                                        <p>No authors available</p>
                                    )}
                                </div>
                                <div>
                                    <h4>Course Authors</h4>
                                    {courseAuthors.length > 0 ? (
                                        courseAuthors.map(author => (
                                            <AuthorItem
                                                key={author.id}
                                                author={author}
                                                buttonText="Delete author"
                                                onButtonClick={handleDeleteAuthor}
                                            />
                                        ))
                                    ) : (
                                        <p>Author list is empty</p>
                                    )}
                                </div>
                            </div>


                        </div>

                        <div>
                            <Button
                                className={css.create__btn}
                                buttonText="cancel"
                                type="button"
                                onClick={() => navigate("/courses")}
                            />
                            <Button
                                className={css.create__btn}
                                buttonText="create course"
                                type="submit"
                            />
                        </div>
                    </form>
                </div>

            </div >
        </section >
    );
}
