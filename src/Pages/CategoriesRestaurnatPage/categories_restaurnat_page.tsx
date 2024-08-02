import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDocs, collection } from '@firebase/firestore';
import firestore from '../../Config/firebase';
import style from './categories_restaurant_page.module.scss';
import burger from '../../images/stock-photo-classic-hamburger-stock-photo-isolated-in-white-2282033179.jpg';
import doner from "../../images/tavuk-doner.webp";
import pizza from "../../images/ev-usulu-pizza-yemekcom.webp";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import Header from "../../Components/Header/header";
import { fetchAndSortRestaurants } from '../../DataServices/sortedRestaurantDataServices';
import CommonRestaurantCard from '../../Components/CommonCard/common_card';

interface Restaurant {
    id: string;
    name: string;
    image: string;
    score: number;
    deliveryTime: number;
    minAmount: number;
}
interface SortMethodMap {
    [key: string]: {
        field: keyof Restaurant;
        order: 'asc' | 'desc';
    };
}

const CategroiesRestaurantsPage: React.FC = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const location = useLocation();
    const navigate = useNavigate();
    const [startIndex, setStartIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
        const sortMethodMap: SortMethodMap = {
            'Fastest Restaurant': { field: 'deliveryTime', order: 'asc' },
            'Best Score': { field: 'score', order: 'desc' },
            'Minimum Order Amount': { field: 'minAmount', order: 'asc' }
        };

        const fetchRestaurants = async () => {
            const category = location.state.category as string;
            const sortMethod = sortMethodMap[category];
            if (sortMethod) {
                const sortedData = await fetchAndSortRestaurants(sortMethod);
                setRestaurants(sortedData);
                setVisibleCount(sortedData.length);
            }
        };

        fetchRestaurants();
    }, [location.state.category]);




    const handleRestaurantClick = (id: string) => {
        navigate(`/restaurant/${id}`);
    };

    const handleSearch = (query: string) => {
        navigate(`/search?query=${query}`);
    };

    return (

        <div>
            <Header onSearch={handleSearch} />
            <div className={style["categoryName"]}>
                {location.state.category}
            </div>
            <CommonRestaurantCard
                restaurants={restaurants}
                visibleCount={visibleCount}
                startIndex={startIndex}
                setStartIndex={setStartIndex}
                handleRestaurantClick={handleRestaurantClick}
            />
        </div>
    );
};

export default CategroiesRestaurantsPage;
