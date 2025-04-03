import { deleteSection } from "../../service/section.service.ts";
import { useSwalAlert } from "../useSwalAlert.ts";

export const useDeleteSection = () => {
  const alert = useSwalAlert();

  const handleDelete = async (sectionId: string) => {
    const confirmDelete = await alert.confirm("¿Estás seguro de que quieres eliminar esta sección?");
    if (!confirmDelete) return false;
    await deleteSection(sectionId);
    return true;
  };

  return { handleDelete }
}
