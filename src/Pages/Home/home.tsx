import Header from "../../Components/Header/header";
import style from './home.module.scss';
import Restaurant from '../../Components/HomeRestaurants/home_restaurants';
import Location from "../../Components/Location/location"
import firestore from '../../Config/firebase';
import { useNavigate } from 'react-router-dom';
import { getDocs, collection } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import RestaurantCardFastest from "../../Components/RestaurantCardFastest/restaurant_card_fastest";
import RestaurantCardMinAmount from "../../Components/RestaurantCardMinAmount/restaurnat_card_min_amount";
import RestaurantCardBestScore from "../../Components/RestaurantCardBestScore/restaurant_card_best_score";
import SpeedIcon from '@mui/icons-material/Speed';
import SellIcon from '@mui/icons-material/Sell';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import BoltSharpIcon from '@mui/icons-material/BoltSharp';
import '../../Styles/color.module.scss';


function Home(props: any) {
    const [categoryNames, setCategoryNames] = useState<any[]>([]);
    const [restaurants, setRestaurants] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'Categories'));
            const categoriesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name, // dokümandan name özelliğini alıyoruz
                ...doc.data()
            }));
            const names = categoriesData.map(category => category.name);
            setCategoryNames(names);
        };

        const fetchRestaurants = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'Restaurant'));
            const restaurantData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                deliveryTime: doc.data().deliveryTime,
                image: doc.data().image,
                minAmount: doc.data().minAmount,
                name: doc.data().name,
                score: doc.data().score,
            }));

            setRestaurants(restaurantData); // Başlangıçta tüm restoranları göster
        };

        fetchCategories();
        fetchRestaurants();
    }, []);

    const handleSearch = (query: string) => {
        navigate(`/search?query=${query}`);
    };

    return (
        <div>
            <Header onSearch={handleSearch} />
            <div className={style["container"]}>
                <div className={style["restorantInfo"]}>
                    <div className={style["category"]}>
                        {categoryNames[0]}
                        <SpeedIcon className={style.icon} sx={{ fontSize: '30px', color: 'var(--header-color)' }}></SpeedIcon>
                    </div>
                </div>
                <div>
                    <RestaurantCardFastest />
                </div>
                <div className={style["restorantInfo"]}>
                    <div className={style["category"]}>
                        {categoryNames[2]}
                        <SellIcon className={style.icon} sx={{ fontSize: 'big', color: 'var(--header-color)' }}></SellIcon>
                    </div>
                </div>
                <div>
                    <RestaurantCardMinAmount />
                </div>
                <div className={style["restorantInfo"]}>
                    <div className={style["category"]}>
                        {categoryNames[1]}
                        <ThumbUpIcon className={style.icon} sx={{ fontSize: 'big', color: 'var(--header-color)' }}></ThumbUpIcon>
                    </div>
                </div>
                <div>
                    <RestaurantCardBestScore />
                </div>
            </div>
        </div>
    );
}

export default Home;
