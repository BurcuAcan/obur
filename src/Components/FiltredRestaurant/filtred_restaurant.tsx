import RestaurantCardFastest from '../RestaurantCardFastest/restaurant_card_fastest';
import RestaurantCardMinAmount from '../RestaurantCardMinAmount/restaurnat_card_min_amount';
import RestaurantCardBestScore from '../RestaurantCardBestScore/restaurant_card_best_score'
import style from './filtred_restaurant.module.scss'
import firestore from '../../Config/firebase';
import { getDocs, collection, getFirestore } from '@firebase/firestore';
import { useEffect, useState } from 'react';

function FiltredRestaurant({ category }: { category: string | null }) {
    const renderRestaurantCard = () => {
        switch (category) {
            case 'fastest':
                return <RestaurantCardFastest />;
            case 'minOrder':
                return <RestaurantCardMinAmount />;
            case 'bestScore':
                return <RestaurantCardBestScore />;
            default:
                return null;
        }
    };


    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                {renderRestaurantCard()}
            </div>

        </div>
    )

}
export default FiltredRestaurant;