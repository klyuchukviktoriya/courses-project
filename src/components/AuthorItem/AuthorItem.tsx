import Button from "@/common/Button/Button";
import css from "./AuthorItem.module.scss";

type Author = {
    id: string;
    name: string;
};

type AuthorItemProps = {
    author: Author;
    buttonText: string;
    onButtonClick: (id: string) => void;
};

export default function AuthorItem({ author, buttonText, onButtonClick }: AuthorItemProps) {
    const { id, name } = author;

    return (
        <div className={css.authorItem}>
            <span>{name}</span>
            <Button
                className={css.author__btn}
                buttonText={buttonText}
                onClick={() => onButtonClick(id)}
            />
        </div>
    );
}
