import { useState } from "react";
import Input from "@/common/Input/Input";
import Button from "@/common/Button/Button";
import css from "./Registration.module.scss";
import { Link, useNavigate } from "react-router-dom";

export default function Registration() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ name?: string, email?: string; password?: string }>({});
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: typeof errors = {};

        if (!name.trim()) newErrors.name = "Name is required";
        else if (name.trim().length < 3)
            newErrors.name = "Name must be at least 3 characters";

        if (!email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            newErrors.email = "Enter a valid email";

        if (!password.trim()) newErrors.password = "Password is required";
        else if (password.length < 6)
            newErrors.password = "Password must be at least 6 characters";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch("http://localhost:4000/register", {
                    method: "POST",
                    body: JSON.stringify({ name, email, password }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const result = await response.json();

                if (!response.ok || !result?.successful) {
                    setApiError(result?.result || "Registration failed");
                    return;
                }

                setApiError("");
                setName("");
                setEmail("");
                setPassword("");
                navigate("/login");
            } catch (error) {
                setApiError("Registration failed. Please try again.");
            }
        }
    };
    return (
        <section>
            <div className={`${css.registration} ${css.container}`}>
                <h2>Registration</h2>
                <div className={css.form__wrapper}>
                    <form onSubmit={handleSubmit}>
                        <Input
                            labelText="Name"
                            onChange={(e) => {
                                setName(e.target.value);
                                if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
                            }}
                            placeholderText="Name"
                            id="name"
                            inputType="text"
                            value={name}
                            errorMessage={errors.name}
                        />
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
                        <Button
                            className={css.registration__button}
                            type="submit"
                            buttonText="register"
                        />
                        <p>If you have an account you may{" "}
                            <Link to="/login" style={{ display: "inline-block" }}>Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
