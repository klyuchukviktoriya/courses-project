import { RootState } from "./index";

export const getCourses = (state: RootState) => state.courses;
export const getAuthors = (state: RootState) => state.authors;

export const getUser = (state: RootState) => state.user;
export const getIsAuth = (state: RootState) => state.user.isAuth;
export const getUserName = (state: RootState) => state.user.name;
export const getUserEmail = (state: RootState) => state.user.email;
export const getToken = (state: RootState) => state.user.token;
