import { useEffect, useState } from "react";
import { ISection } from "../../interfaces/Section";
import { IAlbum } from "../../interfaces/Album";
import AlbumView from "../albums/AlbumView";
import { listenAlbum } from "../../service/album.service";

interface SectionViewProps {
  section: ISection;
}

const SectionView = ({ section }: SectionViewProps) => {
  const [album, setAlbum] = useState<IAlbum | null>(null);

  useEffect(() => {
    if (!section.albumId) return;

    const unsubscribe = listenAlbum(section.albumId, (album) => setAlbum(album));

    return () => unsubscribe();
  }, [section]);

  return (
    <div className="p-4 bg-gray-50 rounded-md">
      <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
      <p className="mb-2">{section.text}</p>
      <p className="mb-2">Order: {section.order}</p>
      <p className="mb-2">ParentPage: {section.parentPage}</p>
      <p className="mb-4">StructureType: {section.structureType}</p>

      {/* Aquí se reutiliza el componente AlbumView para desplegar las imágenes */}
      {album && <AlbumView album={album} />}
    </div>
  );
};

export default SectionView;
