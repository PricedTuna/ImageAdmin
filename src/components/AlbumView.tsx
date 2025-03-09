import React from "react";
import { Album } from "../interfaces/Album";

interface AlbumViewProps {
  album: Album;
}

const AlbumView: React.FC<AlbumViewProps> = ({ album }) => {
  return (
    <div className="flex flex-col space-y-4 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold">{album.name}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {album.images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={`Imagen ${index}`}
            className="object-cover w-full h-48 rounded-md"
          />
        ))}
      </div>
    </div>
  );
};

export default AlbumView;
