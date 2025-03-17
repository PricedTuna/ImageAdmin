import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAlbum } from "../../interfaces/Album";
import { getAlbum } from "../../service/album.service";
import Text from "../microComponents/Text";
import Spinner from "../Spinner.tsx";
import { useAlbum } from "../../hooks/albums/useAlbum.ts";
import Button from "../microComponents/Button.tsx";
import { FaPlus } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import AlbumImagesList from "./albumImages/AlbumImagesList.tsx";

const Album: React.FC = () => {
  const [isFetching, setIsFetching] = useState(false);
  const { albumId: albumParamId } = useParams();
  const { handleUpdateTitle, handleCreateAlbum, handleAddImage } = useAlbum();

  const [album, setAlbum] = useState<IAlbum | null>(null);

  const [albumId, setAlbumId] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [newImageURL, setNewImageURL] = useState("");

  const resetValues = () => {
    setAlbum(null);

    setAlbumId("");
    setAlbumName("");
  };

  const setValues = (album: IAlbum) => {
    setAlbumId(album.id ?? "");
    setAlbumName(album.name);
  };

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

  useEffect(() => {
    if (!album) {
      resetValues();
      return;
    }

    setValues(album);
  }, [album]);

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
            <Button
              variant={"success"}
              onClick={() => handleUpdateTitle(albumId, albumName)}
              icon={<FaPlus />}
              width={"full"}
            >
              Crear album
            </Button>
          )
          : (
            <Button
              variant={"success"}
              onClick={() => handleCreateAlbum(albumName)}
              icon={<MdModeEditOutline />}
              width={"full"}
            >
              Actualizar album
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
              <label className="block text-sm font-medium mb-1">Nueva imagen:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={newImageURL}
                onChange={(e) => setNewImageURL(e.target.value)}
              />
            </div>

            <Button icon={<FaPlus />} variant={"primary"} onClick={() => handleAddImage(albumId, { src: newImageURL }) } width={"full"}>
              Agregar imagen
            </Button>
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
