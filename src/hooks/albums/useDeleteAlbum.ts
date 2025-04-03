import { deleteAlbum, getSectionsByAlbumId } from "../../service/album.service.ts";
import { useSwalAlert } from "../useSwalAlert.ts";

export const useDeleteAlbum = () => {
  const alert = useSwalAlert();

  const handleDelete = async (albumId: string) => {
    const sections = await getSectionsByAlbumId(albumId);
    if (sections.length > 0) {
      await alert.error(`No puedes eliminar este álbum porque está vinculado a ${sections.length} sección(es).`,
        `pertenece a las sección(es). con título: ${sections.map(s => s.title).join(", ")}`);
      return false;
    }

    const confirmDelete = await alert.confirm("¿Estás seguro de que quieres eliminar este álbum?");
    if (!confirmDelete) return false;

    await deleteAlbum(albumId);
    return true;
  };

  return { handleDelete };
};
