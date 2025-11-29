import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "@/common/Input/Input";
import Button from "@/common/Button/Button";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/user/userSlice";
import { loginUser } from "@/services/api";
import css from "./Login.module.scss";

export default function Login() {
    const dispatch = useAppDispatch();
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
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const result = await loginUser(email, password);

                if (!result?.result) {
                    setApiError("Login failed");
                    return;
                }

                const resolvedName =
                    result.user?.name ||
                    result.user?.email ||
                    email.split("@")[0] ||
                    "";

                const resolvedEmail = result.user?.email || email;
                const userData = {
                    name: resolvedName,
                    email: resolvedEmail,
                };

                localStorage.setItem("token", result.result);
                localStorage.setItem("user", JSON.stringify(userData));
                localStorage.setItem("userName", resolvedName);
                localStorage.setItem("userEmail", resolvedEmail);

                dispatch(
                    login({
                        token: result.result,
                        name: resolvedName,
                        email: resolvedEmail,
                    })
                );

                setApiError("");
                setEmail("");
                setPassword("");
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
                            onChange={e => {
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
                            onChange={e => {
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
                        <p>If you don"t have an account you may{" "}
                            <Link to="/registration" style={{ display: "inline-block" }}>Registration</Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
