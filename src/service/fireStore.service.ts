import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { FireApp } from '../config/firebase.config';

const db = getFirestore(FireApp);

interface Category {
  name: string;
  color: string;
}

export const addCategory = async (category: Category) => {
  try {
    const docRef = await addDoc(collection(db, 'categories'), category);
    console.log('Category added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding category:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'categories'));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
