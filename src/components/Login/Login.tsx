import { useState } from "react";
import Input from "@/common/Input/Input";
import Button from "@/common/Button/Button";
import css from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";

type LoginProps = {
    onLoginSuccess?: (token: string, userName: string) => void;
};

export default function Login({ onLoginSuccess }: LoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: typeof errors = {};

        if (!email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            newErrors.email = "Enter a valid email";

        if (!password.trim()) newErrors.password = "Password is required";
        else if (password.length < 6)
            newErrors.password = "Password must be at least 6 characters";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch("http://localhost:4000/login", {
                    method: "POST",
                    body: JSON.stringify({ email, password }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const result = await response.json();

                if (!response.ok || !result?.result) {
                    setApiError(result?.result || "Login failed");
                    return;
                }

                setApiError("");
                setEmail("");
                setPassword("");
                const resolvedName =
                    result?.user?.name ||
                    result?.user?.email ||
                    email.split("@")[0] ||
                    "";

                localStorage.setItem("token", result.result);
                localStorage.setItem("userName", resolvedName);
                localStorage.setItem("user", resolvedName);

                if (onLoginSuccess) {
                    onLoginSuccess(result.result, resolvedName);
                }
                navigate("/courses");
            } catch (error) {
                setApiError("Login failed. Please try again.");
            }
        }

    };

    return (
        <section>
            <div className={`${css.login} ${css.container}`}>
                <h2>Login</h2>
                <div className={css.form__wrapper}>
                    <form onSubmit={handleSubmit}>
                        <Input
                            labelText="Email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                            }}
                            placeholderText="Email"
                            id="email"
                            inputType="email"
                            value={email}
                            errorMessage={errors.email}
                        />

                        <Input
                            labelText="Password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
                            }}
                            placeholderText="Password"
                            id="password"
                            inputType="password"
                            value={password}
                            errorMessage={errors.password}
                        />

                        {apiError && <p className="error__message">{apiError}</p>}

                        <Button className={css.login__button} buttonText="login" type="submit" />
                        <p>If you don't have an account you may{" "}
                            <Link to="/registration" style={{ display: "inline-block" }}>Registration</Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
