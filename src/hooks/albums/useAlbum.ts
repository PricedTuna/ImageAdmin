import { addImageToAlbum, createAlbum, removeImageFromAlbum, updateAlbumTitle } from "../../service/album.service.ts";
import { Image } from "../../interfaces/Image.ts";
import { useSwalAlert } from "../useSwalAlert.ts";


export const useAlbum = () => {
  const alert = useSwalAlert()

  // Función para crear un álbum nuevo
  const handleCreateAlbum = async (albumName: string) => {
    try {
      await createAlbum({ name: albumName, images: [] });
      alert.success("¡Álbum creado correctamente!");
    } catch (error) {
      console.error("Error al crear el álbum:", error);
      alert.error("Error al crear el álbum.");
    }
  };

  // Actualiza el título del álbum
  const handleUpdateTitle = async (albumId: string, newName: string) => {
    try {
      await updateAlbumTitle(albumId, newName);
      alert.success("¡Título actualizado!");
    } catch (error) {
      console.error("Error al actualizar título:", error);
      alert.error("Error al actualizar el título.");
    }
  };

  // Agrega una imagen al álbum
  const handleAddImage = async (albumId: string, image: Image) => {
    try {
      await addImageToAlbum(albumId, image);
      alert.success("¡Imagen agregada!");
    } catch (error) {
      console.error("Error al agregar imagen:", error);
      alert.error("Error al agregar la imagen.");
    }
  };

  // Remueve una imagen del álbum
  const handleRemoveImage = async (albumId: string, image: Image) => {
    try {
      await removeImageFromAlbum(albumId, image);
      alert.success("¡Imagen removida!");
    } catch (error) {
      console.error("Error al remover imagen:", error);
      alert.error("Error al remover la imagen.");
    }
  };

  return { handleCreateAlbum, handleUpdateTitle, handleAddImage, handleRemoveImage }
}
