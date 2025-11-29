
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Author = {
    id: string;
    name: string;
};

const initialState: Author[] = [];

const authorsSlice = createSlice({
    name: "authors",
    initialState,
    reducers: {
        setAuthors: (_, action: PayloadAction<Author[]>) => action.payload,
        addAuthor: (state, action: PayloadAction<Author>) => {
            state.push(action.payload);
        },
        deleteAuthor: (state, action: PayloadAction<string>) =>
            state.filter(author => author.id !== action.payload),
        updateAuthor: (state, action: PayloadAction<Author>) => {
            const index = state.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
    },
});

export const { setAuthors, addAuthor, deleteAuthor, updateAuthor } = authorsSlice.actions;
export default authorsSlice.reducer;
