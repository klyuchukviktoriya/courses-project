import Input from "@/common/Input/Input";
import { mockedAuthorsList } from "@/constants";
import getCourseDuration from "@/helpers/getCourseDuration";
import { useState } from "react";
import AuthorItem from "../AuthorItem/AuthorItem";
import Button from "@/common/Button/Button";
import css from "./CreateCourse.module.scss";
import { Course } from "../Courses/Course.types";

const getInitialAuthors = () => mockedAuthorsList.map(author => ({ ...author }));

type CreateCourseProps = {
    onCancel: () => void;
    onCreateCourse: (
        newCourse: Course,
        newAuthors: { id: string; name: string }[]
    ) => void;
};

export default function CreateCourse({ onCancel, onCreateCourse }: CreateCourseProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [authors, setAuthors] = useState(getInitialAuthors);
    const [courseAuthors, setCourseAuthors] = useState<
        { id: string; name: string }[]
    >([]);
    const [newAuthorName, setNewAuthorName] = useState("");
    const [errors, setErrors] = useState<{
        title?: string;
        description?: string;
        duration?: string;
        authorName?: string;
    }>({});

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
        setAuthors(prev => [...prev, newAuthor]);
        setNewAuthorName("");
        setErrors(prev => ({ ...prev, authorName: "" }));
    };

    const handleAddAuthor = (id: string) => {
        const author = authors.find(a => a.id === id);
        if (!author) return;
        setCourseAuthors(prev => [...prev, author]);
        setAuthors(prev => prev.filter(a => a.id !== id));
    };

    const handleDeleteAuthor = (id: string) => {
        const author = courseAuthors.find(a => a.id === id);
        if (!author) return;
        setAuthors(prev => [...prev, author]);
        setCourseAuthors(prev => prev.filter(a => a.id !== id));
    };

    const handleCreateCourse = () => {
        const newErrors: typeof errors = {};
        if (!title.trim()) newErrors.title = "Required";
        if (!description.trim()) newErrors.description = "Required";
        if (!duration.trim() || Number(duration) <= 0)
            newErrors.duration = "Invalid duration";

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

        const newlyCreatedAuthors = courseAuthors.filter(
            a => !mockedAuthorsList.some(ma => ma.id === a.id)
        );

        onCreateCourse(newCourse, newlyCreatedAuthors);
        onCancel();

        setTitle("");
        setDescription("");
        setDuration("");
        setCourseAuthors([]);
        setAuthors(getInitialAuthors());
        setNewAuthorName("");
    };

    return (
        <section className={css.create}>
            <div className={`${css.create__container} ${css.container}`}>
                <h2>Course Edit/Create Page</h2>

                <form
                    className={css.create}
                    onSubmit={e => {
                        e.preventDefault();
                        handleCreateCourse();
                    }}
                >
                    <div>
                        <h3>Main Info</h3>

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
                        <Input
                            labelText="Duration (min)"
                            onChange={e =>
                                setDuration(e.target.value.replace(/\D/g, ""))
                            }
                            placeholderText="Duration"
                            id="duration"
                            inputType="text"
                            errorMessage={errors.duration}
                            value={duration}
                        />
                        <p>{getCourseDuration(Number(duration))}</p>
                    </div>

                    <div>
                        <h3>Authors</h3>

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

                        <h4>Authors List</h4>
                        {authors.length > 0 ? (
                            authors.map(author => (
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

                    <div>
                        <Button
                            className={css.create__btn}
                            buttonText="cancel"
                            type="button"
                            onClick={onCancel}
                        />
                        <Button
                            className={css.create__btn}
                            buttonText="create course"
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        </section>
    );
}
