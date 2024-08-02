import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonRestaurantCard from '../CommonCard/common_card';
import { fetchAndSortRestaurants } from '../../DataServices/sortedRestaurantDataServices';

function RestaurantCardMinAmount() {
    const [restaurants, setRestaurants] = useState<any[]>([]);
    const [visibleCount, setVisibleCount] = useState(3);
    const [startIndex, setStartIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchAndSortRestaurants({ field: 'minAmount', order: 'asc' });
            setRestaurants(data);
        };

        fetchData();
    }, []);

    const handleRestaurantClick = (id: string) => {
        navigate(`/restaurant/${id}`);
    };

    return (
        <CommonRestaurantCard
            restaurants={restaurants}
            visibleCount={visibleCount}
            startIndex={startIndex}
            setStartIndex={setStartIndex}
            handleRestaurantClick={handleRestaurantClick}
        />
    );
}

export default RestaurantCardMinAmount;
