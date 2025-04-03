import { collection, doc, getFirestore, onSnapshot, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { app } from '../config/firebase.config';
import { ISection } from '../interfaces/Section';

const db = getFirestore(app);

// Colecciones en Firestore
const sectionsCollection = collection(db, 'sections');

/**
 * Elimina una sección en la base de datos.
 * Usa us id como identificador para eliminar una sección de la base de datos.
 * @param sectionId - El ID de la sección a eliminar.
 */
export async function deleteSection(sectionId: string): Promise<void> {
  const sectionRef = doc(db, 'sections', sectionId);
  await deleteDoc(sectionRef);
}

/**
 * Crea una nueva sección en la base de datos.
 * Se almacena el id del álbum relacionado para mantener la normalización.
 */
export async function createSection(section: ISection): Promise<ISection> {
  const sectionDoc = doc(sectionsCollection);
  section.id = section.id || sectionDoc.id;
  await setDoc(sectionDoc, section);
  return section;
}

/**
 * Obtiene una sección a partir de su id.
 */
export function listenSection(id: string, callback: (section: ISection | null) => void) {
  const sectionDocRef = doc(sectionsCollection, id);
  const unsubscribe = onSnapshot(sectionDocRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data() as ISection);
    } else {
      callback(null);
    }
  });
  return unsubscribe; // Invoca esta función para cancelar la suscripción cuando ya no la necesites
}

/**
 * Obtiene todas las secciones de la base de datos.
 */
export function listenAllSections(callback: (sections: ISection[]) => void) {
  const unsubscribe = onSnapshot(sectionsCollection, (querySnapshot) => {
    const sections: ISection[] = [];
    querySnapshot.forEach((doc) => {
      sections.push(doc.data() as ISection);
    });
    callback(sections);
  });
  return unsubscribe; // Llama a esta función para cancelar la escucha cuando ya no lo necesites
}

/**
 * Actualiza cualquier campo de una sección.
 * Con esta función puedes modificar uno o varios parámetros de la sección.
 * @param sectionId - El ID de la sección a actualizar.
 * @param sectionData - Un objeto parcial con los campos a modificar (parcial de Section).
 */
export async function updateSection(sectionId: string, sectionData: Partial<ISection>): Promise<void> {
  const sectionRef = doc(db, 'sections', sectionId);
  await updateDoc(sectionRef, sectionData);
}
