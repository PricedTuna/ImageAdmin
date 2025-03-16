import { IAlbum } from "../../interfaces/Album";

interface Props {
  albums: IAlbum[];
  handleClick: (album: IAlbum) => void;
}

function AlbumsList({ handleClick, albums }: Props) {

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ul className="space-y-4">
        {albums.map((album) => (
          <li
            key={album.id}
            className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 cursor-pointer transition-all duration-300 hover:scale-102 hover:bg-gray-300"
            onClick={() => handleClick(album)}
          >
            <h3 className="text-lg font-semibold">{album.name}</h3>
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
