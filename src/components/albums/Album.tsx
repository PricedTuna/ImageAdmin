import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAlbum } from "../../interfaces/Album";
import { Image } from "../../interfaces/Image";
import {
  addImageToAlbum,
  createAlbum,
  getAlbum,
  removeImageFromAlbum,
  updateAlbumTitle,
} from "../../service/album.service";
import Text from "../microComponents/Text";

const Album: React.FC = () => {
  const [album, setAlbum] = useState<IAlbum | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const { albumId: albumParamId } = useParams();

  const fetchAlbum = async () => {
    if (!albumParamId) return;

    setIsFetching(true);
    const album = await getAlbum(albumParamId);
    setAlbum(album);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchAlbum();
  }, [albumParamId]);

  const [albumId, setAlbumId] = useState("");
  const [newName, setNewName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [albumName, setAlbumName] = useState("");

  useEffect(() => {
    if (!album) return;

    setAlbumId(album.id ?? "");
    setNewName(album.name);
    setAlbumName(album.name);
  }, [album]);

  // Función para crear un álbum nuevo
  const handleCreateAlbum = async () => {
    try {
      await createAlbum({ name: albumName, images: [] });
      alert("¡Álbum creado correctamente!");
    } catch (error) {
      console.error("Error al crear el álbum:", error);
      alert("Error al crear el álbum.");
    }
  };

  // Actualiza el título del álbum
  const handleUpdateTitle = async () => {
    try {
      await updateAlbumTitle(albumId, newName);
      alert("¡Título actualizado!");
    } catch (error) {
      console.error("Error al actualizar título:", error);
      alert("Error al actualizar el título.");
    }
  };

  // Agrega una imagen al álbum
  const handleAddImage = async () => {
    try {
      const image: Image = { src: imageUrl };
      await addImageToAlbum(albumId, image);
      alert("¡Imagen agregada!");
    } catch (error) {
      console.error("Error al agregar imagen:", error);
      alert("Error al agregar la imagen.");
    }
  };

  // Remueve una imagen del álbum
  const handleRemoveImage = async () => {
    try {
      const image: Image = { src: imageUrl };
      await removeImageFromAlbum(albumId, image);
      alert("¡Imagen removida!");
    } catch (error) {
      console.error("Error al remover imagen:", error);
      alert("Error al remover la imagen.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded mt-4">
      <h2 className="text-xl font-bold mb-4">Prueba de Álbum</h2>

      {/* Sección para crear un nuevo álbum */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Nombre del nuevo Álbum:
        </label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
        />
        <button
          onClick={handleCreateAlbum}
          className="w-full bg-purple-500 text-white p-2 rounded mt-2"
        >
          Crear Álbum
        </button>
      </div>

      {/* Sección para actualizar y manipular un álbum existente */}
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">
          Album ID (para actualizaciones):
        </label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={albumId}
          onChange={(e) => setAlbumId(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Nuevo Título:</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <button
        onClick={handleUpdateTitle}
        className="w-full bg-blue-500 text-white p-2 rounded mb-4"
      >
        Actualizar Título
      </button>

      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">URL de Imagen:</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <button
        onClick={handleAddImage}
        className="w-full bg-green-500 text-white p-2 rounded mb-2"
      >
        Agregar Imagen
      </button>
      <button
        onClick={handleRemoveImage}
        className="w-full bg-red-500 text-white p-2 rounded"
      >
        Remover Imagen
      </button>

      <div className="mt-3 flex flex-col space-x-2 overflow-x-auto">
        <Text as="p" size="lg" className="mx-auto">
          Imágenes
        </Text>
        {album ? (
          <div className="flex gap-2">
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
        ) : (
          <p className="text-gray-500 text-sm">Sin imágenes</p>
        )}
      </div>
    </div>
  );
};

export default Album;
