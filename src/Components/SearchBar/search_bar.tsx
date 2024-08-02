import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import style from './seacrh_bar.module.scss';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Formun otomatik olarak submit olmasını önle
            onSearch(query); // Arama fonksiyonunu çağır
        }
    };

    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={(e) => e.preventDefault()}>
                <input className={style.text}
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search"
                />
            </form>
        </div>

    );
};

export default SearchBar;
