import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
    isAuth: boolean;
    name: string;
    email: string;
    token: string;
};

let storedUser: { name?: string; email?: string } | null = null;
const storedUserRaw = localStorage.getItem("user");
if (storedUserRaw) {
    try {
        storedUser = JSON.parse(storedUserRaw);
    } catch {
        storedUser = null;
    }
}
const initialToken = localStorage.getItem("token") ?? "";
const initialName = storedUser?.name ?? localStorage.getItem("userName") ?? "";
const initialEmail = storedUser?.email ?? localStorage.getItem("userEmail") ?? "";

const initialState: UserState = {
    isAuth: Boolean(initialToken),
    name: initialName,
    email: initialEmail,
    token: initialToken,
};

type LoginPayload = {
    name: string;
    email: string;
    token: string;
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginPayload>) => {
            state.isAuth = true;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        logout: state => {
            state.isAuth = false;
            state.name = "";
            state.email = "";
            state.token = "";
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
