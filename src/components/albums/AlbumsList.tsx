import { IAlbum } from "../../interfaces/Album";
import { FaTrash } from "react-icons/fa";

interface Props {
  albums: IAlbum[];
  handleClick: (album: IAlbum) => void;
  handleDelete: (albumId: string) => Promise<boolean>;
}

function AlbumsList({ handleClick, albums, handleDelete }: Props) {

  return (
    <div className="mt-4">
      <ul className="space-y-4">
        {albums.map((album) => (
          <li
            key={album.id}
            className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => handleClick(album)}
          >
            <div className={"flex items-center justify-between"}>
              <h3 className="text-lg font-semibold">{album.name}</h3>
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // evitar que se dispare handleClick
                    handleDelete(album.id ?? "");
                  }}
                  className="text-red-500 hover:text-red-700"
                  title="Eliminar sección"
                >
                  <FaTrash className="text-md cursor-pointer"/>
                </button>
              </div>
            </div>
            <div className="mt-3 flex space-x-2 overflow-x-auto">
              {album.images.length > 0 ? (
                album.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.src}
                    alt={`Imagen ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                  />
                ))
              ) : (
                <p className="text-gray-500 text-sm">Sin imágenes</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default AlbumsList;
