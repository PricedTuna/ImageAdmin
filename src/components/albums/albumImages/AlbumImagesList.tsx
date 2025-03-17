import { IAlbum } from "../../../interfaces/Album.ts";
import Text from "../../microComponents/Text.tsx";
import { useAlbum } from "../../../hooks/albums/useAlbum.ts";
import { FaTrash } from "react-icons/fa";

interface Props {
  album: IAlbum;
}

const AlbumImagesList = ({ album }: Props) => {
  const { handleRemoveImage } = useAlbum();

  if (!album.images || !album.images.length) return <Text as={"p"} size={"md"}>Sin imágenes</Text>;
  return (
    <div className="flex gap-2">
      {album.images.length > 0 ? (
        album.images.map((image, index) => (
          <div className="relative group w-16 h-16">
            <img
              key={index}
              src={image.src}
              alt={`Imagen ${index + 1}`}
              className="w-16 h-16 object-cover rounded-lg border border-gray-300 cursor-pointer transition duration-300 ease-in-out group-hover:brightness-75"
            />
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer"
              onClick={() => handleRemoveImage(album.id ?? "", image)}
            >
              <FaTrash className="text-white text-xl"/>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">Sin imágenes</p>
      )}
    </div>
  );
};

export default AlbumImagesList;
