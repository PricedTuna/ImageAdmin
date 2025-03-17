import { addImageToAlbum, createAlbum, removeImageFromAlbum, updateAlbumTitle } from "../../service/album.service.ts";
import { Image } from "../../interfaces/Image.ts";
import { useSwalAlert } from "../useSwalAlert.ts";


export const useAlbum = () => {
  const alert = useSwalAlert()

  // Función para crear un álbum nuevo
  const handleCreateAlbum = async (albumName: string) => {
    try {
      if( !await alert.confirm("¿Desea crear el album?") ) return;

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
      if( !await alert.confirm("¿Desea actualizar el album?") ) return;

      await updateAlbumTitle(albumId, newName);
      alert.success("¡Album actualizado!");
    } catch (error) {
      console.error("Error al actualizar título:", error);
      alert.error("Error al actualizar el título.");
    }
  };

  // Agrega una imagen al álbum
  const handleAddImage = async (albumId: string, image: Image) => {
    try {
      if( !await alert.confirm("¿Desea agregar la imagen?") ) return;

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
      if( !await alert.confirm("¿Desea eliminar la imagen?") ) return;

      await removeImageFromAlbum(albumId, image);
      alert.success("¡Imagen removida!");
    } catch (error) {
      console.error("Error al remover imagen:", error);
      alert.error("Error al remover la imagen.");
    }
  };

  return { handleCreateAlbum, handleUpdateTitle, handleAddImage, handleRemoveImage }
}
