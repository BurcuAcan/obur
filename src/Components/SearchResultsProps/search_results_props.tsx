import React, { useState } from 'react';
import style from './search_results.module.scss';
import { useNavigate } from 'react-router-dom';
import Header from "../../Components/Header/header";
import CommonRestaurantCard from '../CommonCard/common_card';

interface Restaurant {
    id: string;
    name: string;
    image: string;
    score: number;
    deliveryTime: number;
    minAmount: number;
}

interface SearchResultsProps {
    results: Restaurant[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
    const navigate = useNavigate();
    const [startIndex, setStartIndex] = useState(0);
    const [visibleCount] = useState(3); // or any default visible count

    const handleRestaurantClick = (id: string) => {
        navigate(`/restaurant/${id}`);
    };

    const handleSearch = (query: string) => {
        navigate(`/search?query=${query}`);
    };

    return (
        <div>
            <Header onSearch={handleSearch} />
            <div className={style["container"]}>
                <CommonRestaurantCard
                    restaurants={results}
                    visibleCount={visibleCount}
                    startIndex={startIndex}
                    setStartIndex={setStartIndex}
                    handleRestaurantClick={handleRestaurantClick}
                />
            </div>
        </div>
    );
}

export default SearchResults;
