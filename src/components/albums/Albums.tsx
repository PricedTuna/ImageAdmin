import { useEffect, useState } from "react";
import { IAlbum } from "../../interfaces/Album";
import { getAllAlbums } from "../../service/album.service";
import AlbumsList from "./AlbumsList";
import Spinner from "../Spinner";
import Text from "../microComponents/Text";
import Button from "../microComponents/Button";
import { useNavigate } from "react-router-dom";

interface Props {
  handleClick: (album: IAlbum) => void;
}

function Albums({ handleClick }: Props) {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [isFetching, setIsFetching] = useState(false)

  const navigate = useNavigate()

  const handleFetchSections = async () => {
    setIsFetching(true)

    const sections = await getAllAlbums();
    setAlbums(sections);

    setIsFetching(false)
  };

  useEffect(() => {
    handleFetchSections();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between">
        <Text as="h1" size="3xl">Álbumes</Text>
        <Button onClick={() => navigate("/create-album")} variant="success" >Agregar álbum</Button>
      </div>
      {
        isFetching
          ? <Spinner />
          : <AlbumsList albums={albums} handleClick={handleClick} />
      }
    </div>
  )
}

export default Albums;
