import { getDocs, collection } from '@firebase/firestore';
import firestore from '../Config/firebase';

export async function fetchRestaurants() {
    const querySnapshot = await getDocs(collection(firestore, 'Categories'));
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name
    }));
}
