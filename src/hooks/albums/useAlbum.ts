import { addImageToAlbum, createAlbum, removeImageFromAlbum, updateAlbumTitle } from "../../service/album.service.ts";
import { Image } from "../../interfaces/Image.ts";


export const useAlbum = () => {

  // Función para crear un álbum nuevo
  const handleCreateAlbum = async (albumName: string) => {
    try {
      await createAlbum({ name: albumName, images: [] });
      alert("¡Álbum creado correctamente!");
    } catch (error) {
      console.error("Error al crear el álbum:", error);
      alert("Error al crear el álbum.");
    }
  };

  // Actualiza el título del álbum
  const handleUpdateTitle = async (albumId: string, newName: string) => {
    try {
      await updateAlbumTitle(albumId, newName);
      alert("¡Título actualizado!");
    } catch (error) {
      console.error("Error al actualizar título:", error);
      alert("Error al actualizar el título.");
    }
  };

  // Agrega una imagen al álbum
  const handleAddImage = async (albumId: string, image: Image) => {
    try {
      await addImageToAlbum(albumId, image);
      alert("¡Imagen agregada!");
    } catch (error) {
      console.error("Error al agregar imagen:", error);
      alert("Error al agregar la imagen.");
    }
  };

  // Remueve una imagen del álbum
  const handleRemoveImage = async (albumId: string, image: Image) => {
    try {
      await removeImageFromAlbum(albumId, image);
      alert("¡Imagen removida!");
    } catch (error) {
      console.error("Error al remover imagen:", error);
      alert("Error al remover la imagen.");
    }
  };

  return { handleCreateAlbum, handleUpdateTitle, handleAddImage, handleRemoveImage }
}
