import React, { useEffect, useState } from "react";
import { Section } from "../interfaces/Section";
import { Album } from "../interfaces/Album";
import AlbumView from "./AlbumView";
import { getAlbum } from "../service/album.service";

interface SectionViewProps {
  section: Section;
}

const SectionView: React.FC<SectionViewProps> = ({ section }) => {
  const [album, setAlbum] = useState<Album | null>(null);

  useEffect(() => {
    if (!section.albumId) return;

    getAlbum(section.albumId).then((album) => setAlbum(album));
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
