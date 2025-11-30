type ButtonProps = {
    buttonText?: string;
    onClick?: () => void;
    className: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    children?: any;
};

export default function Button({ buttonText, onClick, className, type = "button", children }: ButtonProps) {
    return (
        <button className={className} onClick={onClick} type={type}>
            {children ?? buttonText}
        </button>
    );
}
