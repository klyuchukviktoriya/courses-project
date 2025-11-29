
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "@/components/Courses/Course.types";

const initialState: Course[] = [];

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        setCourses: (_, action: PayloadAction<Course[]>) => action.payload,
        addCourse: (state, action: PayloadAction<Course>) => {
            state.push(action.payload);
        },
        deleteCourse: (state, action: PayloadAction<string>) =>
            state.filter(course => course.id !== action.payload),
        updateCourse: (state, action: PayloadAction<Course>) => {
            const index = state.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
    },
});

export const { setCourses, addCourse, deleteCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
