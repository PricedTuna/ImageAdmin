import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IAlbum } from "../../interfaces/Album";
import { listenAlbum } from "../../service/album.service";
import Text from "../microComponents/Text";
import Spinner from "../Spinner.tsx";
import { useAlbum } from "../../hooks/albums/useAlbum.ts";
import Button from "../microComponents/Button.tsx";
import { FaPlus, FaTrash } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import AlbumImagesList from "./albumImages/AlbumImagesList.tsx";
import { useDeleteAlbum } from "../../hooks/albums/useDeleteAlbum.ts";

const Album: React.FC = () => {
  const [isFetching, setIsFetching] = useState(false);
  const { albumId: albumParamId } = useParams();
  const { handleUpdateTitle, handleCreateAlbum, handleOnImageInputChange } = useAlbum();
  const { handleDelete } = useDeleteAlbum();
  const navigate = useNavigate();

  const [album, setAlbum] = useState<IAlbum | null>(null);

  const [albumId, setAlbumId] = useState("");
  const [albumName, setAlbumName] = useState("");

  const resetValues = () => {
    setAlbum(null);

    setAlbumId("");
    setAlbumName("");
  };

  const setValues = (album: IAlbum) => {
    setAlbumId(album.id ?? "");
    setAlbumName(album.name);
  };

  useEffect(() => {
    if (!albumParamId) return;

    setIsFetching(true);
    const unsubscribe = listenAlbum(albumParamId ?? "", (album) => setAlbum(album));
    setIsFetching(false);

    return () => unsubscribe();
  }, [albumParamId]);

  useEffect(() => {
    if (!album) {
      resetValues();
      return;
    }

    setValues(album);
  }, [album]);

  const handleDeleteAlbum = async () => {
    if (await handleDelete(albumId)) navigate("/albums");
  };

  if (isFetching) return <Spinner/>;
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded mt-4">
      <h2 className="text-xl font-bold mb-4">Prueba de Álbum</h2>

      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Nuevo Nombre:</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
        />
      </div>

      {
        album && album.id
          ? (
            <div className={"flex flex-col md:flex-row gap-2"}>
              <Button
                variant={"success"}
                onClick={() => handleUpdateTitle(albumId, albumName)}
                icon={<MdModeEditOutline/>}
                width={"full"}
              >
                Actualizar album
              </Button>
              <Button icon={<FaTrash/>} onClick={handleDeleteAlbum} width={"auto"} variant={"danger"} truncate>
                Eliminar sección
              </Button>
            </div>
          )
          : (
            <Button
              variant={"success"}
              onClick={() => handleCreateAlbum(albumName)}
              icon={<FaPlus/>}
              width={"full"}
            >
              Crear album
            </Button>
          )
      }

      {
        album && album.id &&
        (<div className={"mt-4"}>
          <Text as="p" size="lg" className="text-center">
            Imágenes
          </Text>
          <div>
            <div className="mb-2">
              <label
                htmlFor="imageInput"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nueva imagen:
              </label>
              <input
                id="imageInput"
                type="file"
                className="block p-3 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => handleOnImageInputChange(e, albumId)}
              />
            </div>

          </div>
          <div className={"mt-2"}>
            <AlbumImagesList album={album}/>
          </div>
        </div>)
      }
    </div>
  );
};

export default Album;
