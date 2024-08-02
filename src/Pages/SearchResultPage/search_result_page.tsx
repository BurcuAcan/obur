import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchResults from '../../Components/SearchResultsProps/search_results_props';
import { getDocs, collection } from '@firebase/firestore';
import firestore from '../../Config/firebase';


interface Restaurant {
    id: string;
    name: string;
    image: string;
    score: number;
    deliveryTime: number;
    minAmount: number;
}

const SearchResultsPage: React.FC = () => {
    const location = useLocation();
    const [searchResults, setSearchResults] = useState<Restaurant[]>([]);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
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
            setRestaurants(restaurantData);

            const query = new URLSearchParams(location.search).get('query') || '';
            const filteredResults = restaurantData.filter(restaurant =>
                restaurant.name.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filteredResults);
        };

        fetchRestaurants();
    }, [location.search]);

    return<SearchResults results={searchResults} />;

};

export default SearchResultsPage;
