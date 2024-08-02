import React, { useEffect, useState } from 'react';
import { Button } from "@mui/material";
import { useParams, useNavigate } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import StarIcon from '@mui/icons-material/Star';
import Header from "../../Components/Header/header";
import style from "./restaurnat_profile.module.scss";
import { fetchRestaurants } from '../../DataServices/restaurantDataServices';
import { fetchWebsites } from '../../DataServices/websitesiDataServices';
import { fetchWeb } from '../../DataServices/webDataService';

function RestaurantProfile() {
    const { id } = useParams<{ id: string }>();
    const [restaurant, setRestaurant] = useState<any>(null);
    const [web, setWeb] = useState<any[]>([]);
    const [websites, setWebsites] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const restaurantsData = await fetchRestaurants();
            const selectedRestaurant = restaurantsData.find((restaurant: any) => restaurant.id === id);
            const websData = await fetchWeb();
            setRestaurant(selectedRestaurant);
            setWeb(websData);
            if (selectedRestaurant) {
                const websitesData = await fetchWebsites(selectedRestaurant.id);
                setWebsites(websitesData);
            }
        };

        fetchData();
    }, [id]);

    const navigate = useNavigate();
    const handleSearch = (query: string) => {
        navigate(`/search?query=${query}`);
    };

    const handleButtonClick = (websiteId: string, endpoint: string) => {
        const website = web.find((website) => website.id.trim() === websiteId.trim());

        if (website) {
            window.location.href = `${website.baseUrl}${endpoint}`;
        } else {
            console.log("No match found for websiteId:", websiteId);
        }
    };

    if (!restaurant) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header onSearch={handleSearch} />
            <div className={style.container}>
                <div className={style.restaurantDetailsCard}>
                    <div className={style.restaurantDetails}>
                        <img src={restaurant.image} alt={restaurant.name} />
                        <div className={style.name}>
                            {restaurant.name}
                        </div>
                    </div>
                </div>

                <div className={style.sites}>
                    {websites.map((website, index) => {
                        const matchingWeb = web.find((w) => w.id.trim() === website.id.trim());
                        return (
                            <div className={style.sitesCard} key={index}>
                                <div className={style.siteDetails}>
                                    <div className={style.ordering}>
                                        <div className={style.webSiteLogo}>
                                            {matchingWeb && <img src={matchingWeb.image} alt="Website Logo" />}
                                        </div>
                                        <div className={style.value}>
                                            <div className={style.icon}>
                                                <StarIcon sx={{ color: 'var(--header-color)', fontSize: '20px' }}></StarIcon>
                                            </div>
                                            <div className={style.score}>
                                                Average Score: {website.score}
                                            </div>
                                        </div>
                                        <div className={style.value}>
                                            <div className={style.icon}>
                                                <AccessTimeIcon sx={{ color: 'var(--header-color)', fontSize: '20px' }}></AccessTimeIcon>
                                            </div>
                                            <div className={style.score}>
                                                Delivery Time : {website.deliveryTime} min
                                            </div>
                                        </div>
                                        <div className={style.value}>
                                            <div className={style.icon}>
                                                <ShoppingBasketIcon sx={{ color: 'var(--header-color)', fontSize: '20px' }}></ShoppingBasketIcon>
                                            </div>
                                            <div className={style.score}>
                                                Minimum Order Amount: {website.minAmount} TL
                                            </div>
                                        </div>
                                        <div className={style.button}>
                                            <Button
                                                sx={{
                                                    color: "var(--header-color)",
                                                    borderRadius: "50%",
                                                    backgroundColor: "white",
                                                    padding: "10px",
                                                    width: 40,
                                                    height: 40,
                                                    minWidth: 40,
                                                    fontSize: '0.875rem',
                                                    justifyContent: 'center'
                                                }}
                                                variant="contained"
                                                onClick={() => handleButtonClick(website.id, website.endpoint)}
                                            >
                                                OK
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default RestaurantProfile;
