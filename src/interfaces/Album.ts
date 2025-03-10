import { Image } from "./Image";

export interface IAlbum {
  id?: string; // opcional, se asigna automáticamente si no se proporciona
  name: string;
  images: Image[];
}