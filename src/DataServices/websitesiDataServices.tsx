// DataServices/websitesiDataServices.ts
import { getDocs, collection } from '@firebase/firestore';
import firestore from '../Config/firebase';

export const fetchWebsites = async (restaurantId: string) => {
    const websitesCollection = collection(firestore, `Restaurant/${restaurantId}/websites`);
    const querySnapshot = await getDocs(websitesCollection);
    const websitesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    return websitesData;
};
