type ButtonProps = {
    buttonText?: string;
    onClick?: () => void;
    className: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
};

export default function Button({ buttonText, onClick, className, type = "button" }: ButtonProps) {
    return (
        <button className={className} onClick={onClick} type={type}>
            {buttonText}
        </button>
    );
}
