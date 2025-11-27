import { useState } from "react";
import Input from "@/common/Input/Input";
import Button from "@/common/Button/Button";
import css from "./SearchBar.module.scss";

type SearchBarProps = {
    onSearch: (query: string) => void;
    initialValue?: string;
};

export default function SearchBar({ onSearch, initialValue = "" }: SearchBarProps) {
    const [value, setValue] = useState(initialValue);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(value.trim());
    };

    return (
        <form className={css.searchBar} onSubmit={handleSubmit}>
            <Input
                placeholderText="Search"
                inputType="text"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    if (e.target.value === "") onSearch("");
                }}
            />
            <Button buttonText="search" className={css.searchBth} type="submit" />
        </form>
    );
}
