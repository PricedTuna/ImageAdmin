import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { FireApp } from '../config/firebase.config';

const storage = getStorage(FireApp);
const db = getFirestore(FireApp);

export const getImagesByCategory = async (categoryId: string) => {
  try {
    const imagesCollectionRef = collection(db, `categories/${categoryId}/images`);
    const querySnapshot = await getDocs(imagesCollectionRef);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching images by category:', error);
    throw error;
  }
};


export const uploadImageToCategory = async (image: File, categoryId: string) => {
  return new Promise<{ downloadURL: string }>(async (resolve, reject) => {
    const storageRef = ref(storage, `categories/${categoryId}/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error('Upload error:', error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Guardar la URL en la subcolección "images" dentro de la categoría
          const imagesCollectionRef = collection(db, `categories/${categoryId}/images`);
          await addDoc(imagesCollectionRef, { imageUrl: downloadURL });

          console.log('Image uploaded and saved successfully!');
          resolve({ downloadURL });
        } catch (error) {
          console.error('Error saving image URL:', error);
          reject(error);
        }
      }
    );
  });
};
