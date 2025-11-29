import css from "./Input.module.scss";

type InputProps = {
    labelText?: string;
    placeholderText: string;
    id?: string;
    inputType: string;
    value?: string;
    errorMessage?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function Input({ labelText, placeholderText, onChange, value, id, errorMessage, inputType }: InputProps) {
    return (
        <div className={css.input}>
            <label className={css.input__label} htmlFor={id}>
                {labelText}
            </label>

            {inputType === "textarea" ? (
                <textarea
                    onChange={onChange}
                    className={`${css.input__placeholder} ${errorMessage ? css.input__warning : ""}`}
                    id={id}
                    placeholder={placeholderText}
                    value={value}
                />
            ) : (
                <input
                    onChange={onChange}
                    className={`${css.input__placeholder} ${errorMessage ? css.input__warning : ""}`}
                    type={inputType}
                    id={id}
                    placeholder={placeholderText}
                    value={value}
                />
            )}

            {errorMessage && (
                <p className={`${css.input__error} error__message`}>{errorMessage}</p>
            )}
        </div>

    );
}
