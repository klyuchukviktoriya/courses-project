import { Course } from "@/components/Courses/Course.types";
import { Author } from "@/store/authors/authorsSlice";

const API_URL = "http://localhost:4000";

type LoginResponse = {
    successful: boolean;
    result: string;
    user: {
        name: string;
        email: string;
    };
};

type CoursesResponse = {
    successful: boolean;
    result: Course[];
};

type AuthorsResponse = {
    successful: boolean;
    result: Author[];
};

const buildHeaders = (token?: string) => {
    const headers: Record<string, string> = {
        accept: "*/*",
        "Content-Type": "application/json",
    };

    if (token) {
        headers.Authorization = token.startsWith("Bearer") ? token : `Bearer ${token}`;
    }

    return headers;
};

const handleResponse = async <T>(response: Response) => {
    const data = (await response.json()) as T;
    if (!response.ok) {
        throw new Error((data as any)?.result || "Request failed");
    }
    return data;
};

export const loginUser = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: buildHeaders(),
        body: JSON.stringify({ email, password }),
    });

    return handleResponse<LoginResponse>(response);
};

export const fetchCourses = async (token?: string) => {
    const response = await fetch(`${API_URL}/courses/all`, {
        method: "GET",
        headers: buildHeaders(token),
    });

    return handleResponse<CoursesResponse>(response);
};

export const fetchAuthors = async (token?: string) => {
    const response = await fetch(`${API_URL}/authors/all`, {
        method: "GET",
        headers: buildHeaders(token),
    });

    return handleResponse<AuthorsResponse>(response);
};
