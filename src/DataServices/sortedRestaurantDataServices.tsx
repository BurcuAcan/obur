import { getDocs, collection } from '@firebase/firestore';
import firestore from '../Config/firebase';

interface Restaurant {
    id: string;
    deliveryTime: number;
    image: string;
    minAmount: number;
    name: string;
    score: number;
}

interface SortMethod {
    field: keyof Restaurant;
    order: 'asc' | 'desc';
}

export const fetchAndSortRestaurants = async (sortMethod: SortMethod): Promise<Restaurant[]> => {
    const querySnapshot = await getDocs(collection(firestore, 'Restaurant'));
    const restaurantData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        deliveryTime: doc.data().deliveryTime,
        image: doc.data().image,
        minAmount: doc.data().minAmount,
        name: doc.data().name,
        score: doc.data().score,
    }));
    console.log(restaurantData)
    restaurantData.sort((a, b) => {
        const aValue = a[sortMethod.field];
        const bValue = b[sortMethod.field];
        return sortMethod.order === 'asc' ? aValue - bValue : bValue - aValue;
    });
    console.log(restaurantData)
    return restaurantData;
};