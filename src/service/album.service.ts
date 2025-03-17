import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { app } from '../config/firebase.config';
import { IAlbum } from '../interfaces/Album';
import { Image } from '../interfaces/Image';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "@firebase/storage";

const db = getFirestore(app);
const storage = getStorage(app);

const albumsCollection = collection(db, 'albums');

/**
 * Extrae la ruta de almacenamiento del Firebase Storage a partir de la URL de descarga.
 * @param downloadURL - La URL de descarga proporcionada por Firebase.
 * @returns La ruta de almacenamiento en formato legible o null si no se pudo extraer.
 */
export function getStoragePathFromDownloadURL(downloadURL: string): string | null {
  try {
    const url = new URL(downloadURL);
    // La ruta tiene el formato: /v0/b/tu-app.appspot.com/o/images%2Ffoto.jpg
    const pathname = url.pathname;
    const splitPath = pathname.split('/o/');
    if (splitPath.length < 2) {
      return null;
    }
    // La parte codificada: "images%2Ffoto.jpg"
    const encodedPath = splitPath[1];
    // La decodificamos para obtener "images/foto.jpg"
    return decodeURIComponent(encodedPath);
  } catch (error) {
    console.error('Error al extraer la ruta:', error);
    return null;
  }
}

/**
 * Elimina una imagen del Firebase Storage.
 * @param imageUrl - Ruta completa de la imagen en el Storage (ejemplo: "images/1632345678900_foto.jpg").
 */
export async function deleteImageFile(imageUrl: string): Promise<void> {
  const imagePath = getStoragePathFromDownloadURL(imageUrl);

  if(!imagePath) {
    throw new Error('No se proporcionó la ruta de la imagen.');
  }

  // Crea la referencia a la imagen en Storage.
  const imageRef = ref(storage, imagePath);

  try {
    // Elimina la imagen.
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error eliminando la imagen:', error);
    throw error;
  }
}

/**
 * Sube una imagen a Firebase Storage y retorna la URL de descarga.
 * @param file - El archivo (tipo File) seleccionado desde el input.
 * @returns URL de descarga de la imagen.
 */
export async function uploadImageFile(file: File): Promise<string> {
  if (!file) {
    throw new Error('No se proporcionó ningún archivo.');
  }

  // Generamos un nombre único con la fecha y el nombre original.
  const uniqueFileName = `images/${Date.now()}_${file.name}`;
  const storageRef = ref(storage, uniqueFileName);

  try {
    // Sube el archivo.
    await uploadBytes(storageRef, file);
    // Obtiene la URL de descarga.
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    throw error;
  }
}

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
