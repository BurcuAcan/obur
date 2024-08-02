import { getDocs, collection, doc } from '@firebase/firestore';
import firestore from '../Config/firebase';

// Function to fetch websites for a given restaurant ID
async function fetchWebsites(restaurantId: any) {
    const websitesCollection = collection(firestore, `Restaurant/${restaurantId}/websites`);
    const querySnapshot = await getDocs(websitesCollection);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

export async function fetchRestaurants() {
    const querySnapshot = await getDocs(collection(firestore, 'Restaurant'));
    const restaurants = await Promise.all(querySnapshot.docs.map(async (doc) => {
        const websites = await fetchWebsites(doc.id);
        return {
            id: doc.id,
            name: doc.data().name,
            deliveryTime: doc.data().deliveryTime,
            image: doc.data().image,
            minAmount: doc.data().minAmount,
            score: doc.data().score,
            websites: websites,
        };
    }));
    return restaurants;
}
