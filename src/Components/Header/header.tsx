import React from 'react';
import SearchBar from '../SearchBar/search_bar';
import style from './header.module.scss';
import Categories from '../Categories/categories';
import { useNavigate } from 'react-router-dom';
import Location from '../Location/location';
interface HeaderProps {
    onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <div className={style["container"]}>
            <div className={style["header"]}>
                <div className={style["logo"]} role="button" onClick={handleLogoClick} tabIndex={0}>
                    <button style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        font: 'inherit',
                        color: 'inherit',
                        cursor: 'pointer',
                        outline: 'inherit'
                    }}>OBUR</button>
                </div>
                <div className={style["search"]}>
                    <SearchBar onSearch={onSearch} />

                </div>
                <div className={style["location"]}>
                    <Location></Location>
                </div>
                <div className={style["catagories"]}>
                    <Categories />
                </div>
            </div>
        </div>
    );
}

export default Header;
