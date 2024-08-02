import FiltredRestaurant from "../../Components/FiltredRestaurant/filtred_restaurant";
import { useLocation } from 'react-router-dom';
import Header from "../../Components/Header/header";
import Location from "../../Components/Location/location";
import RestaurantCard from "../../Components/RestaurantCardFastest/restaurant_card_fastest";
import style from './filtred_page.module.scss'

function FiltredPage(props: any) {
    const handleSearch = (query: string) => {
        // Bu sayfada arama fonksiyonu kullanılmıyorsa, bu boş bırakılabilir
    };


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    const getCategoryName = (category: string | null) => {
        switch (category) {
            case 'fastest':
                return 'Fastest Restaurant';
            case 'minOrder':
                return 'Minimum Order Amount';
            case 'bestScore':
                return 'Best Score';
            default:
                return 'Restaurant';
        }
    };
    return (
        <div>
            <Header onSearch={handleSearch}></Header>
            <Location></Location>
            <div className={style.container}>
                <div className={style.wrapper}>
                    <div className={style.text}>
                        <div className={style.inner_text}>
                            {getCategoryName(category)?.toUpperCase()}
                        </div>

                    </div>
                    <div className={style.restaurantList}>

                        <FiltredRestaurant category={category}></FiltredRestaurant>
                    </div>
                </div>

            </div>

        </div>

    )

}
export default FiltredPage;