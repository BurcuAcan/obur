import { getDocs, collection } from '@firebase/firestore';
import firestore from '../Config/firebase';

export async function fetchWeb() {
    const querySnapshot = await getDocs(collection(firestore, 'Websites'));
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        baseUrl: doc.data().baseUrl,
        image: doc.data().image,
        ...doc.data()
    }));
}