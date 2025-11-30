import Button from "@/common/Button/Button";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
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
    const isAddAction = buttonText.toLowerCase().includes("add");
    const Icon = isAddAction ? AiOutlinePlus : AiOutlineDelete;

    return (
        <div className={css.authorItem}>
            <span>{name}</span>
            <Button
                className={css.authorItem__btn}
                onClick={() => onButtonClick(id)}>
                <Icon aria-hidden />
                <span className="visually-hidden">{buttonText}</span>
            </Button>
        </div>
    );
}
