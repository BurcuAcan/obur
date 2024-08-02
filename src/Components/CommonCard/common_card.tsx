import React from 'react';
import { useNavigate } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import style from './common_card.module.scss';

interface Restaurant {
    id: string;
    name: string;
    image: string;
    score: number;
    deliveryTime: number;
    minAmount: number;
}

interface RestaurantCardProps {
    restaurants: Restaurant[];
    visibleCount: number;
    startIndex: number;
    setStartIndex: React.Dispatch<React.SetStateAction<number>>;
    handleRestaurantClick: (id: string) => void;
}

const CommonRestaurantCard: React.FC<RestaurantCardProps> = ({ restaurants, visibleCount, startIndex, setStartIndex, handleRestaurantClick }) => {
    const handleShowMore = () => {
        setStartIndex(prevIndex => Math.min(prevIndex + 1, restaurants.length - visibleCount));
    };

    const handleShowLess = () => {
        setStartIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    return (
        <div className={style["container"]}>
            {
                startIndex > 0 && (
                    <div className={style["show-more-left"]}>
                        <button onClick={handleShowLess}>
                            <ArrowBackIosIcon></ArrowBackIosIcon>
                        </button>
                    </div>
                )
            }
            {restaurants.slice(startIndex, startIndex + visibleCount).map((restaurant, index) => (
                <div
                    className={style["info"]}
                    key={restaurant.id}
                    onClick={() => handleRestaurantClick(restaurant.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleRestaurantClick(restaurant.id);
                        }
                    }}
                >
                    <div className={style["card"]}>
                        <img className={style["logo"]} src={
                            restaurant.image
                        } alt={restaurant.name} />
                        <div className={style["name"]}>{restaurant.name}</div>
                        <div className={style["score"]}>
                            <StarIcon sx={{ fontSize: 'small', color: 'red', marginRight: '5px' }} />
                            Score: {restaurant.score}
                        </div>
                        <div className={style["score"]}>
                            <AccessTimeIcon sx={{ fontSize: 'small', color: 'red', marginRight: '5px' }} />
                            Delivery Time: {restaurant.deliveryTime}
                        </div>
                        <div className={style["score"]}>
                            <ShoppingBasketIcon sx={{ fontSize: 'small', color: 'red', marginRight: '5px' }} />
                            Minimum Amount: {restaurant.minAmount}
                        </div>
                    </div>
                </div>
            ))}
            {startIndex + visibleCount < restaurants.length && (
                <div className={style["show-more-right"]}>
                    <button onClick={handleShowMore}>
                        <ArrowForwardIosIcon></ArrowForwardIosIcon>
                    </button>
                </div>
            )}
        </div>
    );
}

export default CommonRestaurantCard;
