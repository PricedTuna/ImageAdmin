import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { app } from '../config/firebase.config';
import { Section } from '../interfaces/Section';

const db = getFirestore(app);

// Colecciones en Firestore
const sectionsCollection = collection(db, 'sections');

/**
 * Crea una nueva sección en la base de datos.
 * Se almacena el id del álbum relacionado para mantener la normalización.
 */
export async function createSection(section: Section): Promise<void> {
  const sectionDoc = doc(sectionsCollection);
  section.id = section.id || sectionDoc.id;
  await setDoc(sectionDoc, section);
}

/**
 * Obtiene una sección a partir de su id.
 */
export async function getSection(id: string): Promise<Section | null> {
  const sectionDocRef = doc(sectionsCollection, id);
  const docSnap = await getDoc(sectionDocRef);
  return docSnap.exists() ? (docSnap.data() as Section) : null;
}

/**
 * (Opcional) Obtiene todas las secciones de la base de datos.
 */
export async function getAllSections(): Promise<Section[]> {
  const querySnapshot = await getDocs(sectionsCollection);
  const sections: Section[] = [];
  querySnapshot.forEach(doc => {
    sections.push(doc.data() as Section);
  });
  return sections;
}

/**
 * Actualiza cualquier campo de una sección.
 * Con esta función puedes modificar uno o varios parámetros de la sección.
 * @param sectionId - El ID de la sección a actualizar.
 * @param sectionData - Un objeto parcial con los campos a modificar (parcial de Section).
 */
export async function updateSection(sectionId: string, sectionData: Partial<Section>): Promise<void> {
  const sectionRef = doc(db, 'sections', sectionId);
  await updateDoc(sectionRef, sectionData);
}