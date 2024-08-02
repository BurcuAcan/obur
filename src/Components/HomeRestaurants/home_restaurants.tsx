import RestaurantCardFastest from '../RestaurantCardFastest/restaurant_card_fastest';
import RestaurantCardMinAmount from '../RestaurantCardMinAmount/restaurnat_card_min_amount';
import style from './home_restaurants.module.scss'
function HomeRestaurant(props: any) {
    return (
        <div className={style["container"]}>
            <div className={style["wrapper"]}>
                <div className={style["inner_wrapper"]}>
                    <RestaurantCardFastest></RestaurantCardFastest>
                    <RestaurantCardMinAmount></RestaurantCardMinAmount>
                    {/* <RestaurantCard></RestaurantCard>
                    <RestaurantCard></RestaurantCard>
                    <RestaurantCard></RestaurantCard>
                    <RestaurantCard></RestaurantCard> */}
                </div>
            </div>
        </div>

    )

}
export default HomeRestaurant;