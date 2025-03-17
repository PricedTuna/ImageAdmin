import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { app } from '../config/firebase.config';
import { IAlbum } from '../interfaces/Album';
import { Image } from '../interfaces/Image';

const db = getFirestore(app);

const albumsCollection = collection(db, 'albums');

/**
 * Crea un nuevo álbum en la base de datos.
 * Si no se pasa un id, se genera uno automáticamente.
 */
export async function createAlbum(album: IAlbum): Promise<IAlbum> {
  const albumDoc = doc(albumsCollection);
  album.id = album.id || albumDoc.id;
  await setDoc(albumDoc, album);
  return album;
}

/**
 * Obtiene un álbum a partir de su id.
 */
export async function getAlbum(id: string): Promise<IAlbum | null> {
  const albumDocRef = doc(albumsCollection, id);
  const docSnap = await getDoc(albumDocRef);
  return docSnap.exists() ? (docSnap.data() as IAlbum) : null;
}

/**
 * Obtiene todos los álbums
 */
export async function getAllAlbums(): Promise<IAlbum[]> {
  const querySnapshot = await getDocs(albumsCollection);
  const albums: IAlbum[] = [];
  querySnapshot.forEach(doc => {
    albums.push(doc.data() as IAlbum);
  });
  return albums;
}

/**
 * Actualiza el título (nombre) de un álbum.
 * @param albumId - El ID del álbum a actualizar.
 * @param newName - El nuevo nombre del álbum.
 */
export async function updateAlbumTitle(albumId: string, newName: string): Promise<void> {
  const albumRef = doc(db, 'albums', albumId);
  await updateDoc(albumRef, { name: newName });
}

/**
 * Agrega una imagen al arreglo de imágenes de un álbum.
 * Utiliza arrayUnion para evitar duplicados.
 * @param albumId - El ID del álbum.
 * @param image - La imagen a agregar.
 */
export async function addImageToAlbum(albumId: string, image: Image): Promise<void> {
  const albumRef = doc(db, 'albums', albumId);
  await updateDoc(albumRef, {
    images: arrayUnion(image)
  });
}

/**
 * Quita una imagen del arreglo de imágenes de un álbum.
 * Utiliza arrayRemove para eliminar la imagen especificada.
 * @param albumId - El ID del álbum.
 * @param image - La imagen a quitar.
 */
export async function removeImageFromAlbum(albumId: string, image: Image): Promise<void> {
  const albumRef = doc(db, 'albums', albumId);
  await updateDoc(albumRef, {
    images: arrayRemove(image)
  });
}

/**
 * Actualiza de manera genérica cualquier campo de un álbum.
 * Puedes usar esta función para actualizar varios parámetros al mismo tiempo.
 * @param albumId - El ID del álbum.
 * @param albumData - Un objeto con los campos a actualizar (parcial de Album).
 */
export async function updateAlbum(albumId: string, albumData: Partial<IAlbum>): Promise<void> {
  const albumRef = doc(db, 'albums', albumId);
  await updateDoc(albumRef, albumData);
}
